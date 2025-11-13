#!/bin/bash
set -e

echo "🚀 Starting Finance Blog API..."
echo "Node version: $(node --version)"
echo "Environment: $NODE_ENV"
echo "Port: ${PORT:-3001}"

# Run the application
exec node dist/main.js
