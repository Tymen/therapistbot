// <=========> Define Variables, Modules <=========> //

// Discord imports
const { Client, Intents} = require('discord.js');
const privateMessage = require('./modules/safeChat/src/private_message_events');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES
], partials: ["CHANNEL"]
});

// Module imports
require('dotenv').config();

const { EventResponse } = require('./modules/commands')
const { serverStatus } = require('./modules/serverStatus/main')
const { dbConnection } = require('./database')
const { privateVoice } = require('./modules/privateVoice/main')
// Define Variable
const { customMessage } = require('./modules/customMessage')
const welcome = client.channels.cache.get('764855446938189836')
var server = [];
let db = new dbConnection();

// <=========> Status Message <=========> //
client.once('ready', async () => {
    await setServer();
    privateMessage(client, server, db.getDB());
    
    await db.migrateDB().then( async () => {
        console.log("Succesfully migrated database")
    });

    setInterval(async () => {
        console.log("Status updated!")
        await serverStatus.updateStatus(server)
    }, 900000)

    client.user.setActivity("+help", {type: "WATCHING"});
    console.log("Bot is online!");
})
// <=========> Listen for messages <=========> //
client.on('messageCreate', message => {
    EventResponse(message, client, server, db.getDB());
})

// <=========> Listen for people that join the server <=========> //
client.on('guildMemberAdd', member => {
    member.guild.channels.cache.find(channel => channel.name === 'infos').send({ embeds: [customMessage.welcomeMessage(member.user, client)] })
})

client.on('voiceStateUpdate', (oldState, newState) => {
    privateVoice(oldState, newState, server, process.env.PRIVATE_VOICE_CHANNEL_ID)
})

// <=========> Not necessary for homies <=========> //
// client.on('guildMemberRemove', member => {
//     member.guild.channels.cache.find(channel => channel.name === 'infos').send(customMessage.leaveMessage(member.user, client))
// })
let setServer = async () => {
    server = client.guilds.cache.find(guilds => guilds.id === process.env.SERVER_ID)
}
// <=========> Login to the discord bot client <=========> //

client.login(process.env.BOT_TOKEN)