// There is room for making the code shorter because all the roll status channels could be combined in one.

let setChannelMemberCount = (server, channel_id) => {
    let channel = server.channels.cache.find(channel => channel.id === channel_id)
    channel.setName("residents: " + server.members.cache.filter(member => !member.user.bot).size)
}

let setChannelAdminCount = (server, channel_id) => {
    let count = 0;
    let channel = server.channels.cache.find(channel => channel.id === channel_id)

    server.members.cache.forEach(member => {
        if (member.roles.cache.some(role => role.id === '993914768190611476')) {
            count++
        }
    })

    channel.setName("admins: " + count)
}

let setChannelModeratorCount = (server, channel_id) => {
    let count = 0;
    let channel = server.channels.cache.find(channel => channel.id === channel_id)

    server.members.cache.forEach(member => {
        if (member.roles.cache.some(role => role.id === '993915188044632075')) {
            count++
        }
    })

    channel.setName("moderators: " + count)
}

let setChannelServerBoosterCount = (server, channel_id) => {
    let count = 0;
    let channel = server.channels.cache.find(channel => channel.id === channel_id)

    server.members.cache.forEach(member => {
        if (member.roles.cache.some(role => role.id === '994712318397132871')) {
            count++
        }
    })

    channel.setName("booster: " + count)
}

let setChannelHelperCount = (server, channel_id) => {
    let count = 0;
    let channel = server.channels.cache.find(channel => channel.id === channel_id)

    server.members.cache.forEach(member => {
        if (member.roles.cache.some(role => role.id === '993915460108156970')) {
            count++
        }
    })

    channel.setName("helper: " + count)
}

let setChannelOnlineCount = (server, channel_id) => {
    let count = 0;
    let channel = server.channels.cache.find(channel => channel.id === channel_id)

    server.members.cache.forEach(member => {
        if (member.presence.status === 'online') {
            count++;
        }
    })

    channel.setName("online: " + count)
}

let setChannelOfflineCount = (server, channel_id) => {
    let count = 0;
    let channel = server.channels.cache.find(channel => channel.id === channel_id)

    server.members.cache.forEach(member => {
        if (member.presence.status === 'offline') {
            count++;
        }
    })

    channel.setName("offline: " + count)
}

const updateStatus = async (server) => {
    setChannelMemberCount(server, "994578293674225828")
    setChannelAdminCount(server, "994586001953521736")
    setChannelModeratorCount(server, "994598879095947404")
    setChannelOnlineCount(server, "994707993419587685")
    setChannelOfflineCount(server, "994709558905815203")
    setChannelServerBoosterCount(server, "994711970148257802")
    setChannelHelperCount(server, "994712910683185202")
}

module.exports = { updateStatus };