
#!/bin/bash

echo "🟢 Starting n8n in the background..."
n8n start &

echo "⏳ Waiting for n8n to initialize..."
sleep 10

echo "🟢 Starting WhatsApp watcher..."
node /app/scripts/index.js
