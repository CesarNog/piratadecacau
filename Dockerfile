FROM node:18

# Install n8n
RUN apt update && apt install -y python3 make g++ curl
RUN npm install --global n8n

# Create folders
WORKDIR /app
COPY scripts/ /app/scripts/
COPY .env /app/.env
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Install WhatsApp dependencies
WORKDIR /app/scripts
RUN npm init -y && npm install @whiskeysockets/baileys axios form-data

WORKDIR /app

EXPOSE 5678
CMD ["/app/entrypoint.sh"]
