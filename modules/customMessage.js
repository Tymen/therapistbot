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
const defaultColor = '#0099ff'
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
        return new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setTitle(`${botName} command list`)
        .setAuthor({name: '\u200B'})
        .addFields(
            { name: '\u200B', value: '\u200B', inline: false },
            { name: '**-> +help**', value: "shows a list of all available commands", inline: false},
            { name: '**-> +play | +p**', value: "Play music from youtube! use links or search arguments", inline: false},
            { name: '**-> +forceplay | +fplay**', value: "Force play a song!", inline: false},
            { name: '**-> +queue | +q**', value: "A list with the current songs in the queue", inline: false},
            { name: '**-> +stop**', value: "Stop playing music and disconnect the bot from the voice channel", inline: false},
            { name: '**-> +pause**', value: "Pause the music", inline: false},
            { name: '**-> +unpause**', value: "unpause the music", inline: false}
        )
        
        .setThumbnail("https://cdn.discordapp.com/attachments/980907254490464256/993610094900170824/Screenshot_2022-01-23_174856.png")
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