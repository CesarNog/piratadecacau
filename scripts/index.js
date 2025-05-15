
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const path = require("path");

const MEDIA_FOLDER = path.join(__dirname, "../media");
const N8N_WEBHOOK = "http://localhost:5678/webhook/whatsapp-media"; // Replace with your n8n instance URL

(async () => {
  const { state, saveCreds } = await useMultiFileAuthState("auth");
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || !msg.key.remoteJid.includes("@g.us")) return;

    const mediaMsg = msg.message.imageMessage || msg.message.videoMessage;
    if (!mediaMsg) return;

    const buffer = await sock.downloadMediaMessage(msg);
    const extension = mediaMsg.mimetype.split("/")[1];
    const fileName = `${Date.now()}.${extension}`;
    const filePath = path.join(MEDIA_FOLDER, fileName);
    fs.writeFileSync(filePath, buffer);

    const caption = mediaMsg.caption || "Post from WhatsApp 📸";

    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    form.append("caption", caption);

    axios.post(N8N_WEBHOOK, form, { headers: form.getHeaders() })
      .then(() => console.log("✅ Media sent to n8n"))
      .catch(err => console.error("❌ Error sending to n8n:", err));
  });
})();
