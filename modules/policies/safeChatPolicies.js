const gPolicies = require('./generalPolicies').generalPolicies

let sendError = (message) => {
    message.channel.send("You can only create a chat when you are in the server and if you are messaging the bot!")
    .then(msg => {
        setTimeout(() => msg.delete(), 5000)
    })
}

// I probabpy overengineered this
const safeChatPolicies = {
    isUserAllowedSafeChat: (server, message) => {
        return new Promise(async (resolve, reject) => {
            await gPolicies.isServerMember(server, message).catch(err => { sendError(message); reject(err)}) && 
            await gPolicies.isDM(message).catch(err => {sendError(message); reject(err)}) ? 
                resolve(true) : reject(false)
        })
    }
}

module.exports = { safeChatPolicies }