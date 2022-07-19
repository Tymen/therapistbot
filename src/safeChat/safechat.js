class SafeChat {
    constructor(messageID, embed) {
        this.messageId = messageID
        this.safeChatEmbed = embed
    }
    getMessageId() {
        return this.messageId
    }
    async #replyEmbed(message, value) {
        return await message.channel.send({ embeds: [value] })
    }
    async sendMessage(message) {
        let msg = await this.#replyEmbed(message, this.safeChatEmbed)
        this.messageId = msg.id
    }
}
module.exports = {SafeChat}