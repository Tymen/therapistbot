const { emotes, channelId } = require('../../config.json')

const createSafeChatMessage = async (message, embed) => {
  let embedmsg = embed;

  let msg = await message.channel.send({embeds: [embedmsg]})
  if (message.channel.id == channelId.primaryHelp) {
    msg.react(emotes.help)
  } else if(message.channel.id == channelId.primarySuggestion){
    msg.react(emotes.suggestions)
  }
  
}

module.exports = { createSafeChatMessage }