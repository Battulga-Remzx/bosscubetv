module.exports = (client) => {
    console.log(`${client.user.tag} is online!`);
    client.user.setActivity("Mobile Legends Bang Bang");
  };