// <=========> Module imports <=========> //

// <=========> Command imports <=========> //
const { createChat } = require('./src/options/createChat');
const { closeChat } = require('./src/options/closeChat');
const { createSafeChatMessage } = require("./safechat")
const sfcPolicies = require('../policies/safeChatPolicies').safeChatPolicies;
const gPolicies = require('../policies/generalPolicies').generalPolicies;


// <=========> Music Commands <=========> //
const safeChat = {
    createChat: async (user, args, server, safeChatUsers, message, embed) => {
        await createChat(user, args, server, safeChatUsers, message, embed)
    },
    closeChat: async (message, args, server, safeChatUsers, client) => {
        await sfcPolicies.isUserAllowedSafeChat(server, message).then(async () => {
            await closeChat(message, args, server, safeChatUsers, client);
        }).catch(err => {console.log(err)})
    },
    createSafeChat: async (message, safeChatEmbed) => {
        await gPolicies.hasAdminRole(message.member).then(async () => {
            await createSafeChatMessage(message, safeChatEmbed);
        }).catch(err => {console.log(err)})
    }
}

module.exports = { safeChat }