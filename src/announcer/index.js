const { channelId } = require('../../config.json')
const { startCollector } = require('./announcerMsgCollector')
const announcer = {
    sendMessage: async (message, prefix, server) => {
        await startCollector(message, prefix, server, channelId)
    }
}
module.exports = { announcer }