#!/bin/bash

# The script terminates if one of the commands returns an error
set -e

# Step 1: Start the server
echo "Starting the server..."

# Go to the server directory
cd server

# Start the server in dev mode (can be changed to production)
npm install
npm run start:dev &

# Save the server PID for future completion
SERVER_PID=$!

# Step 2: Build and run the client with Electron
echo "Building and starting the client..."

# Go to the client directory
cd ../client

# Building a client with Vite
npm install
npm run build

# Verify that the build folder exists
BUILD_DIR="dist"
if [ ! -d "$BUILD_DIR" ]; then
  echo "Build failed, directory $BUILD_DIR does not exist."
  exit 1
fi

# Starting Electron
npx electron .

# When Electron finishes, kill the server
kill $SERVER_PID

echo "Server and client stopped."
