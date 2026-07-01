const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Render ke liye ek dummy Web Server
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Telegram Bot is running smoothly!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Telegram Bot Logic
// Token ko seedha code mein likhne ki jagah hum Environment Variable (env) ka use karenge
const token = process.env.TELEGRAM_BOT_TOKEN; 
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello! Main ready hoon. Mujhe koi message bhejo.");
});

bot.on('message', (msg) => {
  if (msg.text && msg.text.includes('/start')) return;
  
  // Yahan bot user ko wapas reply karega
  bot.sendMessage(msg.chat.id, `✅ Aapka message save kar liya gaya hai: ${msg.text}`);
});
