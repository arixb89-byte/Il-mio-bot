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
    version: '1.20.1',
    checkTimeoutInterval: 60 * 1000
  });

  bot.on('spawn', () => {
    console.log(`✅ Bot entrato nel server con successo!`);
    
    // Auto-login / Auto-register in chat
    setTimeout(() => {
      bot.chat(`/register ${PASSWORD_BOT} ${PASSWORD_BOT}`);
      bot.chat(`/login ${PASSWORD_BOT}`);
    }, 2000);

    // Movimento 100% sicuro per Anti-Cheat: ruota solo la testa e muove il braccio
    setInterval(() => {
      if (bot) {
        bot.swingArm('right');
        // Ruota la testa di poco per risultare attivo al server
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
    console.log('Disconnesso. Riconnessione tra 60 secondi...');
    // Aspetta 60 secondi per evitare il blocco "You must wait before logging in"
    setTimeout(createBot, 60000);
  });
}

createBot();
