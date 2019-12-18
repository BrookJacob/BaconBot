const Discord = require('discord.js');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
    name: 'validRoles',
    description: 'Set up ',
    execute(client, msg, args, db) {
        let reply = new Discord.RichEmbed()
            .setColor('#D6D62A')
            .setAuthor('Admin Command', client.user.avatarURL)
            .setFooter(msg.guild.name);

        if (args === 0) {
            reply.addField("{prefix}valid-role @rolename", "\u200b");
            msg.channel.send({embed: reply});
        } else if (args.length === 1) {
            if (args[0].length > 5) {
                let role_id = args[0].substring[3, args[0].length - 1];
                let added = false;

                msg.guild.roles.forEach(elem => {
                    let serverRoles = String(elem);
                    let temp = serverRoles.substring(3, serverRoles.length - 1);

                    if (temp === role_id) {
                        db.collection('roles').doc(message.guild.id).update({
                            'role_id': FieldValue.arrayUnion(role_id)
                        }).then(() => {
                            reply.addField("✅ Valid Entry", `${args[0]} has access to the bot commands`);
                            msg.channel.send({embed: reply});
                            added = true;
                        });
                    }
                });

                setTimeout(() => {
                    if (!added) {
                        reply.addField("❌ Role Not Found", "The role has to exist on the server");
                        msg.channel.send({embed: reply});
                    }
                }, 2000);
            }
        }
    },
};