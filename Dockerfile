# Build stage
FROM node:23 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Generate Swagger docs
RUN node ace docs:generate

# Build the application
RUN npm run build

# Move the generated swagger.yml to the build folder
RUN cp swagger.yml build/

# Production stage
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Install necessary packages for Puppeteer
RUN apt-get update && apt-get install -y \
  wget \
  gnupg \
  ca-certificates \
  fonts-liberation \
  libasound2 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libgtk-3-0 \
  libnss3 \
  libpango1.0-0 \
  libxss1 \
  libxtst6 \
  --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Copy the built application from the build stage
COPY --from=build /app/build ./build

WORKDIR /app/build

# Install only production dependencies
RUN npm install -g pnpm
RUN pnpm install --only=production

# Expose the port the app runs on
EXPOSE 3333

# Start the AdonisJS application
CMD ["node", "bin/server.js"]