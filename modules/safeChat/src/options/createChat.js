// <=========> createChat Command <=========> //

const createChat = async (message, args, server, safeChatUser) => {
    if (server.members.cache.has(message.author.id) && message.channel.type === "DM") {
        const channel = await server.channels.create(message.author.username, "text")
        .then( async (channel) => {
            let category = server.channels.cache.find(c => c.name == "SUGGESTIONS" && c.type == "GUILD_CATEGORY");
            if (!category) throw new Error("Category channel does not exist");
            channel.setParent(category.id);
            let newChat = {
                dc_UserId: message.author.id,
                channelId: channel.id,
                staffUserId: "1"
            }
            console.log(newChat);
            await safeChatUser.create(newChat);
        }).catch(console.error);
    }else {
        message.channel.send("You can only create a chat when you are in the server and if you are messaging the bot!")
        .then(msg => {
            setTimeout(() => msg.delete(), 5000)
        })
    }
}
module.exports = { createChat };