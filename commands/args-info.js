module.exports = {
    name: 'args-info',
    description: 'Example',
    execute(msg, args) {
        if (!args.length) {
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        }
        return msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
    },
};