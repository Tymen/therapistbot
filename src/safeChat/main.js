// <=========> Module imports <=========> //

// <=========> Command imports <=========> //
const { createChat } = require('./src/options/createChat');
const { closeChat } = require('./src/options/closeChat');
const { SafeChat } = require("./safechat")
const sfcPolicies = require('../policies/safeChatPolicies').safeChatPolicies;


// <=========> Music Commands <=========> //
const safeChat = {
    createChat: async (message, args, server, safeChatUsers) => {
        await sfcPolicies.isUserAllowedSafeChat(server, message).then(async () => {
            await createChat(message, args, server, safeChatUsers)
        }).catch(err => {console.log(err)})
    },
    closeChat: async (message, args, server, safeChatUsers) => {
        await sfcPolicies.isUserAllowedSafeChat(server, message).then(async () => {
            await closeChat(message, args, server, safeChatUsers);
        }).catch(err => {console.log(err)})
    },
    safeChat: async (message, safeChatEmbed) => {
        let chat = new SafeChat(message, safeChatEmbed);
        chat.sendMessage(message)
        console.log(chat.getMessageId)
    }
}

module.exports = { safeChat }