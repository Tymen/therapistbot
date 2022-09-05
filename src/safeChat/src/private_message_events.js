const { MessageFlags } = require("discord.js");
const { customMessage } = require('../../customMessage')
const { roles } = require('../../../config.json')
// const sfcPolicies = require('../../policies/safeChatPolicies').safeChatPolicies;
module.exports = (client, servers, db) => {
    client.on("messageCreate", async message => {
        if (message.channel.type === 'DM') {
            let safeChatUser = db.safeChatUsers
            let getSafeChatUser = await safeChatUser.findOne({ where: { dc_UserId: message.author.id } });
            if (getSafeChatUser){
                if (!message.author.bot) {
                    let channel = servers.channels.cache.find(channel => channel.id == getSafeChatUser.dc_channelId)
                    channel.send(message.content)
                }
            }

            // message.author.send(message.content).catch(console.error);
        } else if (message.channel.type == "GUILD_TEXT" && (message.channel.parent.name === "SUGGESTIONS" || message.channel.parent.name === "HELP")) {
            let safeChatUser = db.safeChatUsers
            const getSafeChatUser = await safeChatUser.findOne({ where: { dc_channelId: message.channel.id } });
            if (getSafeChatUser) {
                if (!message.author.bot) {
                    if (getSafeChatUser.dc_staffUserId) {
                        if (getSafeChatUser.dc_staffUserId == message.author.id) {
                            let author = client.users.cache.get(getSafeChatUser.dc_UserId)
                            author.send(`*${message.content}*`);
                        } else {
                            message.delete();
                            customMessage.tempMessage(message, "<@" + message.author.id+ ">, You are not allowed to interact with this chat! This message is only visible by moderators.", 10)
                        }
                    } else if (message.content == "+claimchat") {
                        await getSafeChatUser.set({dc_staffUserId: message.author.id});
                        await getSafeChatUser.save();
                        message.reply(message.author.username + ", claimed the chat! This message is only visible by moderators")
                        
                        // Temporary solution
                        /**
                         * 
                         * Wanna make a array or object with a loop so it loops through the permissions
                         * 
                         */
                        message.channel.permissionOverwrites.edit(roles.MAINMOD, {
                            VIEW_CHANNEL: false
                        })
                        .then(channel => console.log(channel.permissionOverwrites.cache.get(message.author.id)))
                        .catch(console.error);

                        message.channel.permissionOverwrites.edit(roles.MOD, {
                            VIEW_CHANNEL: false
                        })
                        .then(channel => console.log(channel.permissionOverwrites.cache.get(message.author.id)))
                        .catch(console.error);

                        message.channel.permissionOverwrites.edit(message.author, {
                            VIEW_CHANNEL: true
                        })
                        .then(channel => console.log(channel.permissionOverwrites.cache.get(message.author.id)))
                        .catch(console.error);

                    } else {
                        await message.reply("Use `+claimchat` to claim this chat! This message is only visible by moderators")
                        await message.delete();
                    }
                }
            }
        }
    })
}