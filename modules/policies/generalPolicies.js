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
    }
}

module.exports = { generalPolicies }