// <=========> createChat Command <=========> //

const addSafeChatUser = async (message, channel, safeChatUser) => {
    let newChat = {
        dc_UserId: message.author.id,
        dc_channelId: channel.id,
        dc_staffUserId: "1"
    }
    console.log("Created new safechat!");
    await safeChatUser.create(newChat);
    return safeChatUser;
}

const createNewChannel = async (message, args, server, safeChatUser) => {
    await server.channels.create(`nrunknown-resident`, "text")
        .then( async (channel) => {
            let category = server.channels.cache.find(c => c.name == "HELP" && c.type == "GUILD_CATEGORY");
            if (!category) throw new Error("Category channel does not exist");
            channel.setParent(category.id);
            await addSafeChatUser(message, channel, safeChatUser);
            let getUserId = await safeChatUser.findOne({ where: { dc_UserId: message.author.id } });
            channel.setName(`nr${getUserId.id}-resident`)
        }).catch(console.error);
}

const createChat = async (message, args, server, safeChatUser) => {
    const getSafeChatUser = await safeChatUser.findOne({ where: { dc_UserId: message.author.id } });
    if (getSafeChatUser) {
        message.channel.send("You already have an existing chat session! You can continue chatting with me!").then(message => {
            setTimeout(async () => {message.delete()}, 10000)
        })
    } else {
        await createNewChannel(message, args, server, safeChatUser).then(() => {
            message.channel.send("===============> \n**A safe chat session has been started!**\nYou can now start talking anonymously with Mr.Bob \n\nIf you like to close this session use: `+closechat`\n===============>")
        })
    }
}
module.exports = { createChat };