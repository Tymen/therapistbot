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

const createChat = async (message, args, servers) => {
    if (checkIfIsAnyServer(message, servers) && message.channel.type === "DM") {
        const channel = await servers[1].channels.create(message.author.username, "text")
        .then(channel => {
            let category = servers[1].channels.cache.find(c => c.name == "anonymousbot" && c.type == "GUILD_CATEGORY");
            if (!category) throw new Error("Category channel does not exist");
            channel.setParent(category.id);
        }).catch(console.error);
    }else {
        message.channel.send("You can only create a chat when you are in the server and if you are messaging the bot!")
        .then(msg => {
            setTimeout(() => msg.delete(), 5000)
        })
    }
}
module.exports = { createChat };