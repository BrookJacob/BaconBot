module.exports = {
    name: 'args-info',
    description: 'To be used for an example',
    args: true,
    usage: '<user> <role>',
    execute(client, msg, args, db) {
        return msg.channel.send(`Arguments: ${args}\nArguements Length: ${args.length}`);
    },
};