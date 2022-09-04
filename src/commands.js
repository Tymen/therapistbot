// <=========> Define Variables, Modules <=========> //

// Module imports
require('dotenv').config();

const { customMessage } = require('./customMessage')
const { safeChat } = require('./safeChat/main');
const { serverStatus } = require('./serverStatus/main');
const { announcer } = require('./announcer/index')

// Define Variable
const prefix = process.env.COMMAND_PREFIX;
const reply = (message, value) => {
    return message.channel.send(value)
}
const replyEmbed = (message, value) => {
    return message.channel.send({ embeds: [value] })
}
/**
 * Need to organise this so its more clear what command belongs to what functionality
 * 
 * Might also wanna put all the functionality in a seperate folder
 */

// <=========> Command Handler <=========> //
const EventResponse = (message, client, server, db) => {
    if (!message.author.bot && message.content.startsWith(prefix)){

        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        switch(command) {
            case 'help':
                replyEmbed(message, customMessage.help())
                break;
            case 'closechat': {
                safeChat.closeChat(message, args, server, db.safeChatUsers, client);
                break;
            }
            case 'safechat': {
                safeChat.createSafeChat(message, customMessage.safechat(), server, db.safeChatUsers);
                break;
            }
            case 'ann': {
                announcer.sendMessage(message, prefix, server)
                break;
            }
            case 'updatestatus': {
                serverStatus.updateStatus(server);
                break;
            }
        }
    }

    // <=========> Console message monitor <=========> //
    // console.log(message.author.username + ": " + message.content)
}

module.exports = { EventResponse }