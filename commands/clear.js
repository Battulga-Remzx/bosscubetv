exports.execute = async (client, message, args) => {
    try {
        // Fetch messages in the channel
        const fetched = await message.channel.messages.fetch({ limit: 100 });

        // Delete the fetched messages
        message.channel.bulkDelete(fetched);

        // Optionally, send a confirmation message
        message.channel.send("All messages have been deleted.").then(msg => {
            setTimeout(()=>{
                msg.delete();
            }, 3000)
        })
    } catch (error) {
        console.error("Error deleting messages:", error);
        // Handle any errors that occur during message deletion
        message.channel.send("An error occurred while deleting messages.");
    }
};

exports.help = {
    name: "deleteall",
    aliases: ["clear"],
    usage: "deleteall",
    description: "Deletes all messages in the current channel."
};
