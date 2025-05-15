FROM node:18

WORKDIR /app

COPY scripts/ /app/scripts/
COPY media/ /app/media/
COPY .env /app/.env

WORKDIR /app/scripts

RUN npm init -y && npm install @whiskeysockets/baileys axios form-data

CMD ["node", "index.js"]
