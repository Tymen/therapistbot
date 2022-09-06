const closeChat = async (message, args, server, safeChatUsers, client) => {
    if (message.channel.type == "DM") {
        const getSafeChatUser = await safeChatUsers.findOne({where: {dc_UserId: message.author.id }}).then( async (safeChatUser) => {
            if(safeChatUser){
                let getServerChannel = server.channels.cache.get(safeChatUser.dc_channelId)
                if (getServerChannel) {
                    if (!(await safeChatUser.close_request)) {
                        getServerChannel.send("<@" + (safeChatUser.dc_staffUserId ? safeChatUser.dc_staffUserId : "NotClaimed" ) + ">, The resident wants to close this session, use `+closechat` to end this session.")
                        message.reply("Our moderators have been notified that you want to close this session! Please be patient while we close your session!\n\n**After closing this session, all chat history will be automatically deleted**")
                        await safeChatUser.set({close_request: true})
                        await safeChatUser.save()
                    }else {
                        message.reply("You already requested to close the channel!")
                    }
                } else {
                    message.channel.send("Can't close session channel doesn't exist!")
                }
                
            } else {
                message.channel.send("You don't have an active safe chat session!")
            }
        })
    } else {
        const getSafeChatUser = await safeChatUsers.findOne({where: {dc_staffUserId: message.author.id }}).then((safeChatUser) => {
            if(safeChatUser){
                let getServerChannel = server.channels.cache.get(safeChatUser.dc_channelId)
                let getUser = client.users.cache.find(user => user.id === safeChatUser.dc_UserId)
                if (getServerChannel) {
                    getServerChannel.delete().then(() => {
                        safeChatUser.destroy()
                        getUser.send("Safe chat session has been closed by the moderator")
                    })
                } else {
                    message.channel.send("Can't close session channel doesn't exist!")
                }
            }
        })
    }

}

module.exports = { closeChat }