// <=========> Module imports <=========> //

// <=========> Command imports <=========> //
const { createChat } = require('./src/options/createChat');


// <=========> Music Commands <=========> //
const anonymousBot = {
    createChat: async (message, args, servers) => {
        await createChat(message, args, servers);
    },
}

module.exports = { anonymousBot }