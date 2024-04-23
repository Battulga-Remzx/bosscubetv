const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
    let user = message.author;
    let xp = await client.db.get(`xp_${user.id}`);
    if (xp == null) return xp = 0;
    const embed = new MessageEmbed()
    .setTitle(' **Level** ')
    .setColor('WHITE')
    .setTimestamp()
    .setFooter({ text: `by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
    .setDescription(`🤖 You earned :${xp}xp`);

  message.channel.send({embeds: [embed]})
}
exports.help = {
    name: 'Level',
    aliases: ['lvl', 'level'],
    usage:`level`,
    description:'Show your Level'
}