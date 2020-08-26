
module.exports = {
    help: `Show a FAQ entry from <#${process.env.faq}>`,
    fullHelp: "faq <messageid> - Show the FAQ entry for a specified message ID.",
    execute: async (bot, msg, args) => {
        if (!args[0]) return bot.errText(msg, `please enter a message ID!`);
        faqmsg = await bot.getMessage(process.env.faq, args[0]);
        if (!faqmsg) return bot.errText(msg, `I couldn't get a FAQ entry with that message ID. \nPlease check your input, or ask a developer for assistance.`);
        return bot.msgEmbed(faqmsg, "faq");
    },
}