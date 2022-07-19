// <=========> Define Variables, Modules <=========> //

// Discord Module
const Discord = require('discord.js');

let getMemberCount = (client) => {
    return client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
 };

require('dotenv').config();

// Define Variables
const botName = process.env.BOT_NAME;
const serverName = process.env.SERVER_NAME;
const defaultColor = '#126a38'
const defaultAuthor = { name: botName };

// Custom messages
const customMessage = {
    welcomeMessage: (Author, client) => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle("Welcome to the server, " + Author.username)
        .setAuthor(defaultAuthor)
        .setDescription("Don't forget to read the rules")
        .setDescription("You're member: " + getMemberCount(client))
        .setThumbnail(Author.avatarURL())
    },
    leaveMessage: (Author, client) => {
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle(Author.username + ' left the server')
        .setAuthor(defaultAuthor)
        .setDescription(`${serverName} has ` + getMemberCount(client) + " members")
        .setThumbnail(Author.avatarURL())
    },
    help: () => {
        let cPrefix = process.env.COMMAND_PREFIX
        let cSuffix = `<:green:994975541356671086> ${cPrefix}`
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle(`${botName} command list`)
        .addFields(
            { name: '. . . . . . . . . . . . . . . . . . . . . . . . .', value: '\u200B', inline: false },
            { name: `**${cSuffix}help**`, value: "shows a list of all available commands", inline: false},
            { name: `**${cSuffix}play | ${cPrefix}p**`, value: "Play music from youtube! use links or search arguments", inline: false},
            { name: `**${cSuffix}forceplay | ${cPrefix}fplay**`, value: "Force play a song!", inline: false},
            { name: `**${cSuffix}queue | ${cPrefix}q**`, value: "A list with the current songs in the queue", inline: false},
            { name: `**${cSuffix}stop**`, value: "Stop playing music and disconnect the bot from the voice channel", inline: false},
            { name: `**${cSuffix}pause**`, value: "Pause the music", inline: false},
            { name: `**${cSuffix}unpause**`, value: "unpause the music", inline: false},
            { name: `**${cSuffix}createchat**`, value: "**DM ONLY** Create a anonymous chat", inline: false},
            { name: `**${cSuffix}closechat**`, value: "**DM ONLY** Close a anonymous chat", inline: false},
        )
    },
    safechat: () => {
        let cPrefix = process.env.COMMAND_PREFIX
        let cSuffix = `<:green:994975541356671086> ${cPrefix}`
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle(`${botName} Safechat`)
        .setDescription("Welcome to safechat, How can we help you ?\n Respond with what you want to talk about")
        .addFields(
            { name: '\u200B', value: '\u200B', inline: false },
            { name: `**📜 Suggestion**`, value: "You have any suggestions or questions about the server you can talk to bob!", inline: false},
            { name: `**🖐️ Help**`, value: "Bob is here to help you with your problems talk with him!", inline: false},
        )
    },
    tempMessage: (message, value, delay) => {
        message.channel.send(value).then( msg => {
            setTimeout( () => {
                msg.delete();
            }, delay * 1000);
        })
    },
    queue: (queue) => {
        let embed = new Discord.MessageEmbed();
        embed.setColor(defaultColor)
        embed.setTitle(`${serverName} music queue`)
        embed.setAuthor({name:'\u200B'})
        embed.setThumbnail("https://cdn.discordapp.com/attachments/964616970681085992/964671869116616785/unknown.png")
        embed.addField('\u200B', '\u200B', false);
        for (i = 0; i < queue.length; i++) {
            embed.addField(`${i + 1}: ${queue[i].title}`,'\u200B', false);
        }

        return embed;
    }
}

module.exports = { customMessage }