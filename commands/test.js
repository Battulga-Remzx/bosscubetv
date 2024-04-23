const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
    let user = message.author;
    let test = await client.db.get(`test_${user.id}`);
    client.db.set(`test_${user.id}`, 0);
    // Your test command logic here
    message.channel.send("This is a test command!");

    // Optionally, you can also send an embed
    const embed = new MessageEmbed()
        .setColor("#7289DA")
        .setTitle("Your Blance")
        .setDescription(`This is your Balance: ${test}`)
        .setTimestamp();

    message.channel.send({ embeds: [embed] });
};

exports.help = {
    name: "Test",
    aliases: ['test'],
    usage: "test",
    description: "A test command for testing purposes."
};
