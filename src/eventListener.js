require('dotenv').config();

const { EventResponse } = require('./commands')
const { privateVoice } = require('./privateVoice/main')
const { safeChat } = require('./safeChat/main');
const { channelId } = require('../config.json')
// Define Variable
const { customMessage } = require('./customMessage')
module.exports = (client, server, db) => {
    // <=========> Listen for messages <=========> //
    client.on('messageCreate', message => {
        EventResponse(message, client, server, db.getDB());
    })

    // <=========> Listen for people that join the server <=========> //
    client.on('guildMemberAdd', member => {
        member.roles.add("996472739277840514")
        member.guild.channels.cache.find(channel => channel.id == '993920732914532452').send(`${member.user.username} (${member.user.username}) joined the server!`)
    })
    client.on('guildMemberRemove', member => {
        member.guild.channels.cache.find(channel => channel.id === '993920745816207493').send(`${member.user.username} (${member.user.username}) left the server!`)
    })
    client.on('voiceStateUpdate', (oldState, newState) => {
        privateVoice(oldState, newState, server, channelId.privateVoice)
    })
    client.on('messageReactionAdd', async (reaction, user) => {
        if (!user.bot && reaction.message.channelId === channelId.primaryHelp) {
            await safeChat.createChat(user, "HELP", server, db.getDB().safeChatUsers, reaction.message, customMessage.safechat())
        }
        if (!user.bot && reaction.message.channelId === channelId.primarySuggestion) {
            await safeChat.createChat(user, "SUGGESTIONS", server, db.getDB().safeChatUsers, reaction.message, customMessage.safechat())
        }
    })
}