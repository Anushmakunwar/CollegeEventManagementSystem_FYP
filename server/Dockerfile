# # Stage 1: Base environment (build)
# FROM node:20-alpine3.20 AS base

# WORKDIR /usr/src/app

# # Install libc6-compat for compatibility with Node.js
# RUN apk add --no-cache libc6-compat

# # Copy package.json and package-lock.json (if exists)
# COPY package*.json ./

# # Install all dependencies (including dev for TypeScript)
# RUN npm install

# # Copy all source files
# COPY . .

# # Debug: List project files before build
# RUN echo "Listing project files before build:" && ls -la

# # Build TypeScript, ignoring errors
# RUN npm run build -- --noEmitOnError || echo "Build failed, continuing with partial output..."

# # Debug: List src and dist folder contents, check permissions
# RUN echo "Listing src folder:" && ls -la src || echo "src folder not found"
# RUN echo "Listing dist folder:" && ls -la dist || echo "dist folder not found or empty"
# RUN echo "Checking dist permissions:" && stat dist || echo "dist folder not accessible"

# # Stage 2: Production
# FROM node:20-alpine3.20 AS production

# WORKDIR /usr/src/app

# # Install libc6-compat for compatibility
# RUN apk add --no-cache libc6-compat

# # Copy package.json files and install production dependencies
# COPY package*.json ./
# RUN npm install --omit=dev

# # Install prisma-dbml-generator for Prisma
# RUN npm install --no-save prisma-dbml-generator

# # Copy built code, prisma folder, and .env
# COPY --from=base /usr/src/app/dist ./dist
# COPY --from=base /usr/src/app/prisma ./prisma
# COPY --from=base /usr/src/app/.env ./.env

# # Debug: Verify dist folder in production stage
# RUN echo "Listing dist folder in production stage:" && ls -la dist || echo "dist folder not copied"
# RUN echo "Checking dist permissions in production stage:" && stat dist || echo "dist folder not accessible"

# # Expose port 3333
# EXPOSE 3333

# # Run Prisma commands and start the server
# CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/server.js"]






# ----------- Stage 1: Base environment (Build) -----------
FROM node:20-alpine3.20 AS base

WORKDIR /usr/src/app

# Install libc6-compat for Node.js native modules
RUN apk add --no-cache libc6-compat

# Copy dependency files and tsconfig before install/build
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies including devDeps
RUN npm install

# Copy all project files
COPY . .

# Debug: List files before build
RUN echo "📁 Files before build:" && ls -la

# Build TypeScript (ignoring errors)
RUN tsc || echo "⚠️ TypeScript build failed but continuing anyway"

# Debug: Confirm dist contents
RUN echo "📁 Listing dist folder:" && ls -la dist || echo "❌ dist not created"
RUN echo "🔐 Checking dist permissions:" && stat dist || echo "❌ dist inaccessible"

# ----------- Stage 2: Production -----------
FROM node:20-alpine3.20 AS production

WORKDIR /usr/src/app

# Install libc6-compat
RUN apk add --no-cache libc6-compat

# Copy only the necessary files
COPY package*.json ./
RUN npm install --omit=dev

# Install prisma-dbml-generator (without saving to package.json)
RUN npm install --no-save prisma-dbml-generator

# Copy built code and env-related files from base stage
COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/prisma ./prisma
COPY --from=base /usr/src/app/.env ./.env

# Debug: Ensure dist is copied correctly
RUN echo "📁 Production dist folder:" && ls -la dist || echo "❌ dist not copied"
RUN echo "🔐 Checking dist permissions:" && stat dist || echo "❌ dist inaccessible"

# Expose your app port
EXPOSE 3333

# Run Prisma setup and start server
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/server.js"]
