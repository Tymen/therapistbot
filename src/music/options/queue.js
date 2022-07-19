// <=========> Play command <=========> //

// Import custom message module
const { customMessage } = require('../../customMessage')

const queue = {
    addQueue: async (message, args, ytdl, servers, option) => {
        if (!args[0]) {
            customMessage.tempMessage(message, "Provide a search argument or a link!", 5);
        }
    
        if(!message.member.voice.channel) {
            customMessage.tempMessage(message, "You must be in a voice channel to play music!", 5);
        }
        
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };

        if (args[0] && message.member.voice.channel) {
            var server = servers[message.guild.id];
            let yt_info = await ytdl.search(args.join(" "), { source : { youtube : "video" } })
            musicCache = {
                title: `${ yt_info[0].title } (${ yt_info[0].durationRaw }) | ${ yt_info[0].channel.name }`,
                url: yt_info[0].url
            }

            if (option.firstInQueue == true) {
                server.queue.unshift(musicCache);
            } else {
                server.queue.push(musicCache);
                await customMessage.tempMessage(message, `Added ${musicCache.title} to the queue`, 5);
            }
            
        }
    },
    getQueue: (queue) => {
        return customMessage.queue(queue);
    },
}
module.exports = { queue };