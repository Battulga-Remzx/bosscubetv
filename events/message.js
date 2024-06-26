module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;
    client.prefix = client.config.prefix;
    if (!message.content.startsWith(client.prefix)) return;
    let args = message.content.slice(client.prefix.length).trim().split(" ");
    let commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    if (!command) return;
    client.ecoAddUser = message.author.id;
    command.execute(client, message, args);
};