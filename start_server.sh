#!/bin/bash

echo "🌐 Starting RUGS AND ROOTS Local Development Server..."
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed or not in PATH"
    echo "   Please install Python 3.x from https://python.org"
    echo
    exit 1
fi

# Make the script executable if it isn't already
chmod +x serve.py

# Start the server
python3 serve.py