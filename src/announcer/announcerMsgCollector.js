const startCollector = async (message, prefix, server, channelId) => {

    const confirmation = await message.channel.send(`
    Hey! you want me to make an announcement!\nAmazing type your message and send it in this channel!\nThis session will end in 20min, ${message.author}\nUse ${prefix}cancel to stop!\nUse ${prefix}submit to send the message!
    `);

    const filter = (m) => m.author.id === message.author.id;

    const collector = confirmation.channel.createMessageCollector(filter, {
    time: 1200000,
    });
    message.channel.send('Do you want to mention everyone? yes/no')

    collector.on('end', (collected, reason) => {
        // only send a message when the "end" event fires because of timeout
        message.channel.send(`${message.author}, Session ended!`);
    });

    let announcementContent = "";
    let mentionEveryone = null;
    // fires when a response is collected
    collector.on('collect', async (msg) => {
        if (msg.author.bot) return;
        if (mentionEveryone === null) {
            if (msg.content.toLowerCase() === "yes") {
                mentionEveryone = true;
            } else if (msg.content.toLowerCase() === "no") {
                mentionEveryone = false;
            }
            return message.channel.send("What will be your message ?")
        } else {
            if(msg.content.toLowerCase().startsWith(`${prefix}cancel`)) {
                return collector.stop()
            }
            if(msg.content.toLowerCase().startsWith(`${prefix}submit`)) {
                if(announcementContent.length > 0) {
                    message.channel.send("Succesfully send the message!")
                    collector.stop()
                    return server.channels.cache.get(channelId.announcement).send(mentionEveryone ? "@everyone \n" + announcementContent : announcementContent)
                }
            }
            message.channel.send(`${message.author} Want to send this message? Use ${prefix}submit\nIf you send a new message you can update your message!\nIf you want to cancel use ${prefix}cancel`)
        }
        announcementContent = msg.content
        return
    });
}
module.exports = { startCollector }