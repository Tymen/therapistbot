require('dotenv').config();
const generalPolicies = {
    isServerMember: (server, message) => {
        return new Promise((resolve, reject) => {
            server.members.cache.has(message.author.id) ? resolve(true) : reject(false)
        })
    },
    isDM: (message) => {
        return new Promise((resolve, reject) => {
            message.channel.type === "DM" ? resolve(true) : reject(false)
        })
    },
    hasConversationRole: (message, server) => {
        return new Promise( async (resolve, reject) => {
            let member = await server.members.fetch(message.author.id)
            if (member) {
                member._roles.find(role => role === process.env.CONVERSATION_ROLE_ID) ? resolve(true) : reject("User does not have the role: CONVERSATIONS")
            } else {
                reject("User does not exist in the server!")
            }
        })
    }
}

module.exports = { generalPolicies }