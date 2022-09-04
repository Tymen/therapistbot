// <=========> createChat Command <=========> //
const { emotes } = require('../../../../config.json')
const { createSafeChatMessage } = require("../../../safeChat/safechat")

const addSafeChatUser = async (user, channel, safeChatUser) => {
    let newChat = {
        dc_UserId: user.id,
        dc_channelId: channel.id,
        dc_staffUserId: null
    }
    console.log("Created new safechat!");
    await safeChatUser.create(newChat);
    return safeChatUser;
}

const createNewChannel = async (user, catg, server, safeChatUser) => {
    await server.channels.create(`nrunknown-${catg}`, "text")
        .then( async (channel) => {
            let category = server.channels.cache.find(c => c.name == catg && c.type == "GUILD_CATEGORY");
            if (!category) throw new Error("Category channel does not exist");
            channel.setParent(category.id);
            await addSafeChatUser(user, channel, safeChatUser);
            let getUserId = await safeChatUser.findOne({ where: { dc_UserId: user.id } })
            channel.setName(`nr${getUserId.id}-${catg}`)
        }).catch(console.error);
}

const createChat = async (user, category, server, safeChatUser, message, embed) => {
    const getSafeChatUser = await safeChatUser.findOne({ where: { dc_UserId: user.id } })
    createSafeChatMessage(message, embed)
    message.delete();
    if (getSafeChatUser) {
        user.send("You already have an existing chat session! You can continue chatting with me!").then(user => {
            setTimeout(async () => {user.delete()}, 10000)
        })
    } else {
        await createNewChannel(user, category, server, safeChatUser).then(() => {
            user.send("**Hello resident!**\n\nI have created an anonymous chat session.\n\n*I will be using italic lettering so you know that it is an anonymous chat session. *\n\nYou can start messaging me or you can use: `+closechat` to close this session.")
        })
    }
}
module.exports = { createChat };