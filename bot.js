const fs = require('fs');
const Discord = require("discord.js");
var { prefix, token } = require("./config.json");
const firebase = require('firebase/app');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://baconbot-7882c.firebaseio.com"
});

let db = admin.firestore();


const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    db.collection('guilds').doc(msg.guild.id).get().then((q) => {
        if (q.exists) {
            prefix = q.data().prefix;
        }
    }).then(() => {
        if (!msg.content.startsWith(prefix) || msg.author.bot) return;

        const args = msg.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift();
     
        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        if (command.args && !args.length) {
            let reply = ` you didn't include any arguments.`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return msg.reply(reply);
        }
    
        try {
            command.execute(client, msg, args, db, prefix);
        } catch (error) {
            console.error(error);
            msg.reply(`There was an eror trying to execute that command: ${error}`);
        }
    });
});

client.on('guildCreate', async gData => {
    db.collection('guilds').doc(gData.id).set({
        'guildId': gData.id,
        'guildName': gData.name,
        'guildOwner': gData.owner.user.username,
        'guildOwnerID': gData.owner.id,
        'guildMemberCount': gData.memberCount,
        'prefix': '!'

    });

    db.collection('roles').doc(gData.id).set({
        role_id: []
    });
});
client.login(token);