#!/bin/bash

# Start n8n in background
n8n start &

# Wait a bit for n8n to be ready
sleep 10

# Start WhatsApp watcher
node /app/scripts/index.js
