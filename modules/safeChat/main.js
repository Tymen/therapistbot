// <=========> Module imports <=========> //

// <=========> Command imports <=========> //
const { createChat } = require('./src/options/createChat');
const { dbConnection } = require('../../database')
const connectionDb = new dbConnection()
const db = connectionDb.getDB();
const safeChatUser = db.safeChatUsers;

// <=========> Music Commands <=========> //
const safeChat = {
    createChat: async (message, args, servers) => {
        await createChat(message, args, servers, safeChatUser);
    },
}

module.exports = { safeChat }