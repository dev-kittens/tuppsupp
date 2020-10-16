const Fuse = require("fuse.js");

module.exports = {
    help: `Show a FAQ entry from <#${process.env.faq}>`,
    fullHelp: "faq <messageid> - Show the FAQ entry for a specified message ID.",
    execute: async (bot, msg, args) => {
        if (!args[0]) return bot.errText(msg, `please enter a message ID or search term!`);
        let faqmsg;
        if(/\d{10,30}/.test(args[0])) {
            faqmsg = await bot.getMessage(process.env.faq, args[0]);
            if (!faqmsg) return bot.errText(msg, `I couldn't get a FAQ entry with that message ID. \nPlease check your input, or ask a developer for assistance.`);
        } else if(/\d{1,10}/.test(args[0])) {
            let msgs = await bot.getMessages(process.env.faq,100);
            let num = +args[0];
            if(num >= msgs.length) return bot.errText(msg, `could not find ${num} FAQ entries.`);
            faqmsg = msgs.reverse()[num];
        } else {
            let msgs = await bot.getMessages(process.env.faq,100);
            const fuse = new Fuse(msgs, {keys: ["content"]});
            faqmsg = fuse.search(args.join(" "))[0];
            if(!faqmsg) return bot.errText(msg, `could not find matching FAQ entry.`);
            faqmsg = faqmsg.item;
        }
        return bot.msgEmbed(faqmsg, "faq");
    },
}