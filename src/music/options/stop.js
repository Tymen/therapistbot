// <=========> Stop command <=========> //

// Import discord voice module
const { getVoiceConnection } = require('@discordjs/voice');

const stop = (message, server) => {
    connection = getVoiceConnection(message.guild.id);
    server.queue = [];
    if(connection) connection.destroy();
}
module.exports = { stop };