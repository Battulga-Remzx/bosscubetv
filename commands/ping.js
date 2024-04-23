const { MessageEmbed } = require("discord.js");

exports.execute = (client, message, args) => {

  function setCd() {
    client.db.set(`pingCd_${message.author.id}`, 5);
  }

  const user = message.author;
  const yourping = new Date().getTime() - message.createdTimestamp;
  const botping = Math.round(client.ws.ping);
  const embed = new MessageEmbed()
    .setTitle('🏓 **Pong** 🏓')
    .setColor('WHITE')
    .setTimestamp()
    .setFooter({ text: `by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
    .setDescription(`📡 Your Ping: ${yourping}ms\n====================\n🤖 Bot Ping: ${botping}ms`);

  message.channel.send({embeds: [embed]})
};

exports.help = {
  name: "Ping",
  aliases: ["ping"],
  usage: "ping",
  description: "Show BOT ms and Your ms"
};
