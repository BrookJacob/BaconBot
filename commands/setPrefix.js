module.exports = {
    name: 'setPrefix',
    description: 'Set a new custom prefix for the server',
    execute(client, msg, args, db) {
        if (args.length < 1) return msg.reply('You seem to be missing a prefix');
        let nPrefix = args[0];

        db.collection('guilds').doc(msg.guild.id).update({
            'prefix': nPrefix
        }).then(() => {
            msg.channel.send(`Prefix has been update to: ${nPrefix}`);
        });
    },
};