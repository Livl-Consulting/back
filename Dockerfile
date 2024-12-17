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

# Build the application
RUN npm run build

# Production stage
FROM node:23-alpine

# Set the working directory
WORKDIR /app

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