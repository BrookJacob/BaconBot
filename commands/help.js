const Discord = require('discord.js')

module.exports = {
    name: 'help',
    aliases: ['commands', 'command'],
    description: 'Lists all commands / Get help with a specific command',
    usage: '/ !help <command>',
    execute(client, msg, args, db, prefix) {
        msg.content.trim();
        if (!args.length) {
            let reply = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle('Supported Commands for !BaconBot')
                .setDescription('Here is the current list of supported commands:')
                .addBlankField();

            client.commands.forEach(command => {
                let description = '';
                let info = `${prefix}${command.name}`;
                if (command.usage) {
                    info += ` ${command.usage}`;
                }
                if (command.aliases) {
                    info += '\nAliase(s): '
                    command.aliases.forEach(alias => {
                        info += `${prefix}${alias} / `;
                    });
                    info = info.slice(0, info.length - 3);
                }
                if (command.description) {
                    description = `${command.description}`;
                }
                reply.addField(info, description);
            });
            return msg.author.send({embed: reply});
        }

        if (args.length != 1) return msg.reply(` you have typed in too many arguements. The ${prefix}help command only supports 1 optional arguement.`)

        const commandName = args.shift();
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return msg.reply(` that command does not exist. Please refer to ${prefix}help for a list of supported commands.`);

        let reply = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle(`Help page for: ${prefix}${command.name}`)
            .addBlankField();
        
        let info = `${prefix}${command.name}`;
        let description = '';
        
        if (command.usage) {
            info += ` ${command.usage}`;
        }
        if (command.aliases) {
            info += '\nAliase(s): '
            command.aliases.forEach(alias => {
                info += `${prefix}${alias} / `;
            });
            info = info.slice(0, info.length - 3);
        }
        if (command.description) {
            description += `${command.description}`;
        }

        reply.addField(info, description);
        return msg.author.send({embed: reply});

    },
};