###################
#   Build stage   #
###################
FROM node:23-alpine AS build

# Set the working directory
WORKDIR /app

# Install Chromium and other dependencies
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

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





########################
#   Production stage   #
########################
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Install Chromium and other dependencies
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


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