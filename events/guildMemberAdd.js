module.exports = (client, member) => {
    // Send a welcome message
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome'); // Replace 'welcome' with your actual welcome channel name
    if (welcomeChannel) {
      welcomeChannel.send(`Welcome to the ${member.guild.name}, ${member}!`);
    }
  
    // Assign auto role
    const autoRole = member.guild.roles.cache.find(role => role.name === 'No Team');
    if (autoRole) {
      member.roles.add(autoRole);
    }
  };
  