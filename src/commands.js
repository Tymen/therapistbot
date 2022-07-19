// <=========> Define Variables, Modules <=========> //

// Module imports
require('dotenv').config();

const { customMessage } = require('./customMessage')
const { music } = require('./music/main')
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
            case 'welcome':
                reply(message, `${message.author} joined the server`);
                break;
            case 'leave':
                reply(message, `${message.author} left the server`);
                break;
            case 'help':
                replyEmbed(message, customMessage.help())
                break;
            case 'play': case 'p':
                music.playMusic(message, args, server);
                break;
            case 'forceplay': case 'fplay': 
                music.forcePlay(message, args, server);
                break;
            case 'pause':
                music.pause();
                break;
            case 'unpause':
                music.unpause();
                break;
            case 'stop':
                music.stop(message, server);
                break;
            case 'skip':
                music.skip(message, server);
                break;
            case 'queue': case 'q': 
                if (server[message.guild.id]) {
                    replyEmbed(message, music.getQueue(server[message.guild.id]?.queue));
                } else {
                    customMessage.tempMessage(message, "There are no songs in the queue", 5)
                }
                break;
            case 'createchat': {
                safeChat.createChat(message, args, server, db.safeChatUsers);
                break;
            }
            case 'closechat': {
                safeChat.closeChat(message, args, server, db.safeChatUsers);
                break;
            }
            case 'safechat': {
                safeChat.safeChat(message, customMessage.safechat());
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