module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(client, msg, args, db) {
        msg.channel.send('Pong.');
    },
};