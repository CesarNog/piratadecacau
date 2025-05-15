# 🐾 Pirata de Cacau - Instagram Automation Project

## Architecture
```
📱 WhatsApp Group
    ⬇
🕵️ Node.js script (Baileys)
    ⬇
🖼️ Saves image/video locally
    ⬇
🌐 Sends to n8n Webhook:
    - media URL
    - caption
    ⬇
🤖 n8n Workflow:
    - Uploads to Google Drive
    - Saves to post queue (Google Sheets)
    - Cron scheduler posts to Instagram every 2–3h
```

## Folders

- `scripts/`: WhatsApp watcher script (Baileys)
- `media/`: Incoming saved images/videos
- `n8n-workflows/`: Importable workflows (.json)
