const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Lists all commands / Get help with a specific command',
    usage: '/ !help <command>',
    execute(client, msg, args, db, prefix) {
        msg.content.trim();
        if (msg.content.length <= 5) {
            let reply = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle('Supported Commands for !BaconBot')
                .setDescription('Here is the current list of supported commands:')
                .addBlankField();

            client.commands.forEach(command => {
                let tmp_reply_description = '';
                let tmp_reply = `${prefix}${command.name}`;
                if (command.usage) {
                    tmp_reply += ` ${command.usage}`;
                }
                if (command.description) {
                    tmp_reply_description = `${command.description}`;
                }
                reply.addField(tmp_reply, tmp_reply_description);
            });
            return msg.channel.send({embed: reply});
        }

        if (args.length > 1) return msg.reply(' you have typed in too many arguements. The !help command only supports 1 optional arguement.')

        const commandName = args.shift();

        if (!client.commands.get(commandName)) return msg.reply(' that command does not exist. Please refer to !help for a list of supported commands.');

        const command = client.commands.get(commandName);

        let reply = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle(`Help page for: ${prefix}${command.name}`)
            .addBlankField();
        
        let info = `${prefix}${command.name}`;
        let description = '';
        
        if (command.usage) {
            info += ` ${command.usage}`;
        }
        if (command.description) {
            description += `${command.description}`;
        }

        reply.addField(info, description);
        return msg.channel.send({embed: reply});

    },
};