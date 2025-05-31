#!/bin/sh

# Wait for backend to be up
echo "⏳ Waiting for backend..."
until nc -z backend 3333; do
  echo "Backend is not ready yet... sleeping"
  sleep 2
done

echo "✅ Backend is up. Starting build..."
pnpm run build

echo "🚀 Starting Next.js server..."
pnpm start
