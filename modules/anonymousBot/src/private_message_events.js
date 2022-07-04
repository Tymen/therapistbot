module.exports = (client, triggerText, replyText) => {
    client.on("messageCreate", message => {
        if (message.content.toLowerCase() === triggerText.toLowerCase()) {
            message.author.send(replyText)
        }
        if (message.channel.type === 'DM') {
            console.log(message.content)
            message.author.send(message.content).catch(console.error);
        }
    })
}