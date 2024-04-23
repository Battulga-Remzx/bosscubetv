const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

const { QuickDB } = require("quick.db");
const db = new QuickDB();
client.db = db;

client.config = require('./config.js');
client.commands = new Collection();
client.aliases = new Collection();

const fs = require("fs");
const message = require('./events/message.js');

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(f => {
    if (!f.endsWith(".js")) return;
    const event = require(`./events/${f}`);
    let eventName = f.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(f => {
    if (!f.endsWith(".js")) return;
    let command = require(`./commands/${f}`);
    client.commands.set(command.help.name, command);
    command.help.aliases.forEach(alias => {
      client.aliases.set(alias, command.help.name);
    });
  });
});

client.on('messageCreate', async (message) => {
  let user = message.author;
  let xp = await client.db.get(`xp_${user.id}`);
  
  if (message.content) {
      await client.db.add(`xp_${user.id}`, 1);
      // Increment XP by 1 when a message is sent
      xp = await client.db.get(`xp_${user.id}`);
  }
  
});


client.login(client.config.token);

require('./server.js')();