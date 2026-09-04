
const mineflayer = require('mineflayer');
const express = require('express');

const SERVER_IP = "abyssinian.aternos.host";
const SERVER_PORT = 41807;
const BOT_NAME = "Giginoilgoat";
const PASSWORD_BOT = "Gigino1234";

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
    checkTimeoutInterval: 60 * 1000
  });

  bot.on('spawn', () => {
    console.log(`✅ Bot entrato nel server con successo!`);
    
    setTimeout(() => {
      bot.chat(`/register ${PASSWORD_BOT} ${PASSWORD_BOT}`);
      bot.chat(`/login ${PASSWORD_BOT}`);
    }, 2000);

    // Solo rotazione dello sguardo (nessun salto che attiva l'anti-cheat)
    setInterval(() => {
      if (bot && bot.entity) {
        bot.swingArm('right');
        const yaw = (bot.entity.yaw + 0.5) % (Math.PI * 2);
        bot.look(yaw, 0, true);
      }
    }, 20000);
  });

  bot.on('message', (message) => {
    console.log(`[CHAT] ${message.toAnsi()}`);
  });

  bot.on('kicked', (reason) => {
    console.log(`Kickato dal server per: ${JSON.stringify(reason)}`);
  });

  bot.on('error', (err) => {
    console.log(`Errore: ${err.message}`);
  });

  bot.on('end', () => {
    console.log('Disconnesso. Riconnessione tra 30 secondi...');
    setTimeout(createBot, 30000);
  });
}

createBot();
