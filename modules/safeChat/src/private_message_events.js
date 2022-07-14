module.exports = (client, servers) => {
    client.on("messageCreate", message => {
        // if (message.content.toLowerCase() === triggerText.toLowerCase()) {
        //     message.author.send(replyText)
        // }
        if (message.channel.type === 'DM') {
            console.log(message.content)
            if (!message.author.bot) {
                let channel = servers.channels.cache.find(channel => channel.name == "test")
                channel.send(message.content)
            }
            // message.author.send(message.content).catch(console.error);
        } else if (message.channel.type == "GUILD_TEXT" && message.channel.name == "test") {
            if (!message.author.bot) {
                let author = client.users.cache.get("269521399188684802")
                author.send(message.content);
            }
        }
    })
}