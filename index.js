const mineflayer = require('mineflayer');
const express = require('express');

const SERVER_IP = "abyssinian.aternos.host";
const SERVER_PORT = 41807;
const BOT_NAME = "Giginoilgoat";
const PASSWORD_BOT = "Gigino1234"; // Imposta una password a tua scelta per l'autologin

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
    version: '1.20.1',
    checkTimeoutInterval: 60 * 1000
  });

  bot.on('spawn', () => {
    console.log(`✅ Bot entrato nel server con successo!`);
    
    // Auto-login / Auto-register se richiesto dal server
    setTimeout(() => {
      bot.chat(`/register ${PASSWORD_BOT} ${PASSWORD_BOT}`);
      bot.chat(`/login ${PASSWORD_BOT}`);
    }, 2000);

    // Azione AFK antiepulsione ogni 15 secondi
    setInterval(() => {
      if (bot) {
        bot.swingArm('right');
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 15000);
  });

  // Leggi i messaggi di chat nei log per capire se serve un comando specifico
  bot.on('message', (message) => {
    console.log(`[CHAT] ${message.toAnsi()}`);
  });

  bot.on('kicked', (reason) => {
    console.log(`Kickato dal server per: ${reason}`);
  });

  bot.on('error', (err) => {
    console.log(`Errore: ${err.message}`);
  });

  bot.on('end', () => {
    console.log('Disconnesso. Riconnessione tra 10 secondi...');
    setTimeout(createBot, 10000);
  });
}

createBot();
