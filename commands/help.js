const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setColor("#7289DA")
    .setAuthor("Commands", client.user.displayAvatarURL())
    .setDescription("Here is a list of available commands:")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(message.author.tag, message.author.displayAvatarURL());

  client.commands.forEach(cmd => {
    embed.addField(
      `**${cmd.help.name}**`,
      `**Description:** ${cmd.help.description}\n` +
      `**Aliases:** ${cmd.help.aliases.join(", ") || "None"}\n` +
      `**Usage:** \`${client.prefix}${cmd.help.usage}\`\n` +
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      false
    );
  });

  return message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "Help",
  aliases: ["help"],
  usage: "help",
  description: "Displays a list of available commands."
};
