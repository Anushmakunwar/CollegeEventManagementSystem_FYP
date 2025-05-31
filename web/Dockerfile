# Stage 1: Build
FROM node:20-alpine3.20 AS build

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies only once
COPY package*.json ./
RUN npm ci --production=false

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine3.20 AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only necessary files from the build stage
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/public ./public

# Install production dependencies
RUN npm ci --production

# Expose the port the Next.js app runs on
# Set environment variable for port
ENV PORT=5171

# Expose port 5171
EXPOSE 5171

# Command to run the application
CMD ["npm", "run", "start"]

# COPY docker-entrypoint.sh /docker-entrypoint.sh
# RUN chmod +x /docker-entrypoint.sh

# EXPOSE 3000
# ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]

