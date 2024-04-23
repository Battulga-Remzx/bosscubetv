const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
    try {
        // Generate a random number between 1 and 10
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        let attempts = 5; // Number of attempts allowed

        // Send the question to the user
        const questionEmbed = new MessageEmbed()
            .setColor("#7289DA")
            .setTitle("Random Number Quiz")
            .setDescription(`You have ${attempts} attempts to guess the correct number.\n\nType your answer in the chat.`)
            .setTimestamp();

        // Send the question as an embed
        const questionMessage = await message.channel.send({ embeds: [questionEmbed] });

        // Filter to collect the user's answer
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector({ filter, time: 15000 });

        collector.on("collect", async m => {
            const userAnswer = parseInt(m.content);
            let resultMessage;

            // Check if the user's answer is correct
            if (!isNaN(userAnswer) && userAnswer === randomNumber) {
                resultMessage = "Correct! 🎉";
            } else {
                attempts--; // Decrement attempts
                if (attempts > 0) {
                    resultMessage = `Incorrect! 😔 You have ${attempts} attempt(s) left.`;
                } else {
                    resultMessage = `Incorrect! 😔 The correct number was ${randomNumber}.`;
                }
            }

            // Send the result message
            message.channel.send(resultMessage);

            // Stop the collector if answer is correct or attempts are exhausted
            if (userAnswer === randomNumber || attempts === 0) {
                collector.stop();
            }
        });

        collector.on("end", () => {
            // Delete the question message
            questionMessage.delete().catch(console.error);
        });
    } catch (error) {
        console.error("Error executing random number quiz command:", error);
        message.channel.send("An error occurred while executing the random number quiz command.");
    }
};

exports.help = {
    name: "quiz",
    aliases: ['quiz'],
    usage: "quiz",
    description: "Starts a random number quiz from 1 to 10 with 5 chances to guess."
};
