const { roles } = require('../../config.json')

const getMembers = (channelState) => {
    let memberCount = channelState.channel.members;
    return memberCount
}

const createPrivateVoice = async (server, onJoinState, category, channelName) => {
    await server.channels.create(channelName, {
        type: 'GUILD_VOICE',
    }).then((channel) => {
        if(category){
            channel.setParent(category.id)
            channel.setUserLimit(2)
        }
        onJoinState.member.voice.setChannel(channel.id)
    })
}

const updatePrivateVoicePerms = async (server, channelId, permissions) => {
    await server.channels.cache.get(channelId).permissionOverwrites.create(roles.CONVERSATIONS, permissions)
}

const privateVoice = async(onLeftState, onJoinState, server, privateChannelID) => {
    const getVCJoin = onJoinState.member.voice.channel;
    const getCategory = server.channels.cache.find(c => c.id == "997794639673315358");

    if (getVCJoin) {
        let getParentId = await onJoinState.member.voice.channel.parentId;

        if (getVCJoin.id == privateChannelID) {
            const voiceChannelName = `reserved`
            await createPrivateVoice(server, onJoinState, getCategory, voiceChannelName)
        }

        if(getParentId === getCategory.id) {
            const memberCount = getMembers(onJoinState).size
            if (memberCount >= 2) {
                await updatePrivateVoicePerms(server, onJoinState.member.voice.channel.id, {
                    'VIEW_CHANNEL': false,
                    'CONNECT': false
                })            }
        }
    }

    if (onLeftState.channel) {
        let getParentId = await onLeftState.channel.parentId;
        if (getParentId === getCategory.id) {
            if(onLeftState.channel.parent.id  === getCategory.id) {
                const memberCount = getMembers(onLeftState).size
                if (memberCount < 2) {
                    await updatePrivateVoicePerms(server, onLeftState.channel.id, {
                        'VIEW_CHANNEL': true,
                        'CONNECT': true
                    })
                }
                if (memberCount == 0) {
                    onLeftState.channel.delete()
                }
            }
        }
    };
}

module.exports = { privateVoice }