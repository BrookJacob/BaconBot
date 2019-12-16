module.exports = {
    name: 'kick',
    description: 'Fake kick people',
    execute(msg, args) {
        if (!msg.mentions.users.size)  return msg.reply('You need to mention people with \'@\' in order to kick them!');
        
        const taggedUser = msg.mentions.users.first();
        msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    },
};