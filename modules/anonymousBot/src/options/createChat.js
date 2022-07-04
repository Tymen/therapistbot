// <=========> Stop command <=========> //

// Import discord voice module

function checkIfIsAnyServer(message, servers) {
    for(let i = 0; i < servers.length; i++) {
        if (servers[i].members.cache.has(message.author.id)) {
            return true;
        }
    }
    return false;
}

const createChat = (message, args, servers) => {
    if (checkIfIsAnyServer(message, servers)) {
        servers[1].channels.create("test", "text");
        timer = setTimeout(5000, {
            
        })
        servers[1].channels.cache.find(channel => channel.name == "test")
    }
}
module.exports = { createChat };