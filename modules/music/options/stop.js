// <=========> Stop command <=========> //

// Import discord voice module
const { getVoiceConnection } = require('@discordjs/voice');

const stop = (message, servers) => {
    connection = getVoiceConnection(message.guild.id);
    servers[message.guild.id].queue = [];
    if(connection) connection.destroy();
}
module.exports = { stop };