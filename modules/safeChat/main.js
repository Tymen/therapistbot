// <=========> Module imports <=========> //

// <=========> Command imports <=========> //
const { createChat } = require('./src/options/createChat');
const { closeChat } = require('./src/options/closeChat');
const sfcPolicies = require('../policies/safeChatPolicies').safeChatPolicies;


// <=========> Music Commands <=========> //
const safeChat = {
    createChat: async (message, args, server, safeChatUsers) => {
        await sfcPolicies.isUserAllowedSafeChat(server, message).then(async (resolved) => {
            console.log(resolved)
            await createChat(message, args, server, safeChatUsers)
        }).catch(err => {console.log(err)})
    },
    closeChat: async (message, args, server, safeChatUsers) => {
        await sfcPolicies.isUserAllowedSafeChat(server, message).then(async (resolved) => {
            await closeChat(message, args, server, safeChatUsers);
        }).catch(err => {console.log(err)})
    }
}

module.exports = { safeChat }