const closeChat = async (message, args, server, safeChatUsers) => {
    const getSafeChatUser = await safeChatUsers.findOne({where: {dc_UserId: message.author.id }}).then((safeChatUser) => {
        let getServerChannel = server.channels.cache.get(safeChatUser.dc_channelId)
        if(safeChatUser){
            
            if (getServerChannel) {
                getServerChannel.delete().then(() => {
                    safeChatUser.destroy()
                    message.channel.send("Safe chat session has ended!")
                })
            } else {
                message.channel.send("Can't close session channel doesn't exist! Contact a staff member!")
            }
            
        } else {
            message.channel.send("You don't have an active safe chat session!")
        }
    })
}

module.exports = { closeChat }