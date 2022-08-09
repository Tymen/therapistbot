const { createChat } = require('./src/options/createChat');
const createSafeChatMessage = async (message, embed, server, safeChatUsers) => {
    const filter = m => m.author.id === message.author.id; //Filter for the collector. Only messages where the new messages author ID matched the one that started the collector.
    const DM = await message.channel.send({embeds: [embed]}); //We're creating a DM channel with the user that ran the command.
    const collector = DM.channel.createMessageCollector({filter, time: 30000});
    collector.on('collect', async m => { //Triggered when the collector is receiving a new message
      let msg = m.content.toLowerCase()
      switch (msg) {
        case "help":
          await createChat(message, "HELP", server, safeChatUsers)
          break;
        case "suggestion":
          await createChat(message, "SUGGESTIONS", server, safeChatUsers)
          break;
        default:
          m.reply("respond with ``help`` or ``suggestion``")
          break;
      }
      console.log(m.content); //Console log the content of the message
    })
}
module.exports = { createSafeChatMessage }