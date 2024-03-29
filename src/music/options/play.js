// <=========> Play command <=========> //

// Import discord voice and customMessage module
const { joinVoiceChannel, getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const { customMessage } = require('../../customMessage')
require('dotenv').config();

const botName = process.env.BOT_NAME;

const play = async (message, ytdl, servers, player, option) => {
    let playMusic = async (voiceConnection, message) => {

        /* Define basic variables

        connection: get the voice connection object
        Server: get the queue for the right server based on guild id
        stream: get the audio stream from the url
        resource: create a audio source that discord can use.

        */

        // need to change this because server is changed
        let connection = voiceConnection(message.guild.id);
        let server = servers[message.guild.id];
        let stream = await ytdl.stream(server.queue[0].url)
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })

        // Play music on the discord audioplayer
        await player.play(resource)

        // Play the audioplayer on the discord bot
        await connection.subscribe(player)

        server.dispatcher = await connection.subscribe(player);

        // If the player is on idle it will queue the next song if it exists

        // There is a bug with the queue in combination with forceplay i will need to fix this
        player.on("idle", async () => {
            if(server.queue[0].url){
                server.queue.shift();
                console.log(server.queue);
                await playMusic(getVoiceConnection, message);
            }else {
                connection.destroy();
            }
        })
    }

    // If the bot isn't connected to a voice channel it will join the voice channel fr
    if(!getVoiceConnection(message.guild.id) && !option.skip) {
        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
        playMusic(getVoiceConnection, message);
    }

    // If the skip variable is on true it will check if the bot is connected and then it will play the next song
    if (option.skip || option.forcePlay) {
        if (getVoiceConnection(message.guild.id)) {
            if(servers[message.guild.id]?.queue?.length > 0) {
                getQueue = servers[message.guild.id].queue;
                if(option.skip){
                    getQueue.shift();
                }
                if (getQueue.length > 0) {
                    customMessage.tempMessage(message, "Now playing: " + getQueue[0].title, 5)
                    playMusic(getVoiceConnection, message);
                    // if (option.forcePlay) {
                    //     getQueue.shift();
                    // }
                } else {
                    customMessage.tempMessage(message, "The queue is empty!", 5)
                    message.channel.send("The queue is empty!")
                    getVoiceConnection(message.guild.id).destroy();
                }
            }else {
                customMessage.tempMessage(message, "The queue is empty!", 5)
                getVoiceConnection(message.guild.id).destroy();
            }
        } else {
            message.channel.send(`${botName} is not in a voice channel!`)
        }
    }
}

module.exports = { play }