const mineflayer = require('mineflayer');
const express = require('express');

const SERVER_IP = "SosticeMC.aternos.me";
const SERVER_PORT = 41807;
const BOT_NAME = "Giginoilgoat";

const app = express();
app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  console.log(`Connessione a ${SERVER_IP}:${SERVER_PORT}...`);
  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: BOT_NAME,
    auth: 'offline',
    version: false
  });

  bot.on('spawn', () => {
    console.log(`✅ Bot entrato nel server!`);
    setInterval(() => {
      if (bot) {
        bot.swingArm('right');
      }
    }, 30000);
  });

  bot.on('error', (err) => console.log(`Errore: ${err.message}`));
  bot.on('end', () => {
    console.log('Disconnesso. Riconnessione tra 15 secondi...');
    setTimeout(createBot, 15000);
  });
}

createBot();









