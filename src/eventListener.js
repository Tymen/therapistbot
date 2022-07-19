require('dotenv').config();

const { EventResponse } = require('./commands')
const { privateVoice } = require('./privateVoice/main')
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
        member.guild.channels.cache.find(channel => channel.id == '993920732914532452').send(`${member.user} joined the server!`)
    })

    client.on('voiceStateUpdate', (oldState, newState) => {
        privateVoice(oldState, newState, server, channelId.privateVoice)
    })
    client.on('guildMemberRemove', member => {
        member.guild.channels.cache.find(channel => channel.id === '993920745816207493').send(`${member.user} left the server!`)
    })
}