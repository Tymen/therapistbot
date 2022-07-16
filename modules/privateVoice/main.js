const privateVoice = async(oldState, newState, server, privateChannelID) => {
    const getVCNew = newState.member.voice.channel;
    const serverID = server.id
    const category = server.channels.cache.find(c => c.name == "PRIVATE VOICE" && c.type == "GUILD_CATEGORY");
    if(getVCNew) {
        if (getVCNew.id == privateChannelID) {
            const voiceChannelName = `Private ${newState.member.user.username}`
            const createChannel = await server.channels.create(voiceChannelName, {
                type: 'GUILD_VOICE',
            }).then((channel) => {
                if(category){
                    channel.setParent(category.id)
                }
                newState.member.voice.setChannel(channel.id)
            })
        }
    }
    if (oldState.channel) {
        if(oldState.channel.parent.id  === category.id) {
            let memberCount = 0;
            oldState.channel.members.each(member=>{
                memberCount++
            })
            if (memberCount == 0 ) {
                oldState.channel.delete();
            }
        }
    };
}

module.exports = { privateVoice }