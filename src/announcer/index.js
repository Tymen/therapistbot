const { channelId } = require('../../config.json')
const { startCollector } = require('./announcerMsgCollector')
const gPolicies = require('../policies/generalPolicies').generalPolicies
const announcer = {
    sendMessage: async (message, prefix, server) => {
        await gPolicies.isUserAllowedSafeChat(server, message).then(async () => {
            await startCollector(message, prefix, server, channelId)
        }).catch(err => {console.log(err)})
    }
}
module.exports = { announcer }