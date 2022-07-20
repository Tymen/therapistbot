const createSafeChatMessage = async (message, embed) => {
    const sentMessage = await message.channel.send('React to this!');
    const MAX_REACTIONS = 2;
    // react to the sent message
    await sentMessage.react('👍');

    // set up a filter to only collect reactions with the 👍 emoji
    // and don't count the bot's reaction
    const filter = (reaction, user) => reaction.emoji.name === '👍' && !user.bot;

    // set up the collecrtor with the MAX_REACTIONS
    const collector = sentMessage.createReactionCollector({
      filter,
      max: MAX_REACTIONS,
    });

    collector.on('collect', (reaction) => {
      // in case you want to do something when someone reacts with 👍
      console.log(`Collected a new ${reaction.emoji.name} reaction`);
    });

    // fires when the time limit or the max is reached
    collector.on('end', (collected, reason) => {
      // reactions are no longer collected
      // if the 👍 emoji is clicked the MAX_REACTIONS times
      if (reason === 'limit')
        return message.channel.send(`We've just reached the maximum of ${MAX_REACTIONS} reactions.`);
    });
    // await message.channel.send({embeds: [embed]}).then(async msg => {
    //     msg.react("<:help:999084112092610661>")
    //     msg.react("<:suggestion:999086112502992977>")
    //     const filter = (reaction, user) => {
    //         return reaction.emoji.name === '👍' && user.id === message.author.id;
    //     };
        
    //     msg.awaitReactions({ filter, max: 4, time: 60000, errors: ['time'] })
    //         .then(collected => console.log(collected.size))
    //         .catch(collected => {
    //             console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
    //         });
    // })
    // const filter = (reaction, user) => {
    //     return user.id === message.author.id;
    // };
}
module.exports = { createSafeChatMessage }