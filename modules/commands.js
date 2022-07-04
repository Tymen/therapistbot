// <=========> Define Variables, Modules <=========> //

// Module imports
require('dotenv').config();
const { customMessage } = require('./customMessage')
const { music } = require('./music/main')
const { anonymousBot } = require('./anonymousBot/main');

// Define Variable
const prefix = process.env.COMMAND_PREFIX;
const reply = (message, value) => {
    return message.channel.send(value)
}
const replyEmbed = (message, value) => {
    return message.channel.send({ embeds: [value] })
}

// <=========> Command Handler <=========> //
const EventResponse = (message, client, servers) => {
    if (!message.author.bot && message.content.startsWith(prefix)){

        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        switch(command) {
            case 'welcome':
                replyEmbed(message, customMessage.welcomeMessage(message.author, client));
                break;
            case 'help':
                replyEmbed(message, customMessage.help())
                break;
            case 'play': case 'p':
                music.playMusic(message, args, servers);
                break;
            case 'forceplay': case 'fplay': 
                music.forcePlay(message, args, servers);
                break;
            case 'pause':
                music.pause();
                break;
            case 'unpause':
                music.unpause();
                break;
            case 'stop':
                music.stop(message, servers);
                break;
            case 'skip':
                music.skip(message, servers);
                break;
            case 'queue': case 'q': 
                if (servers[message.guild.id]) {
                    replyEmbed(message, music.getQueue(servers[message.guild.id]?.queue));
                } else {
                    customMessage.tempMessage(message, "There are no songs in the queue", 5)
                }
                break;
            case 'createchat': {
                anonymousBot.createChat(message, args, servers);
                break;
            }
        }
    }

    // <=========> Console message monitor <=========> //
    console.log(message.author.username + ": " + message.content)
}

module.exports = { EventResponse }