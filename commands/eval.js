const util = require("util");

module.exports = {
    help: "Evaluate arbitrary JS code",
    fullHelp: "eval <code>",
    execute: async (bot, msg, args) => {
        if (msg.author.id != msg.member.guild.ownerID) return bot.errText(msg, `only the owner, <@${msg.member.guild.ownerID}>, may evaluate JS code.`);

        let out;
        try {
            out = await eval(msg.content.slice(14).trim());
        } catch(e) { out = e.toString(); }
        return util.inspect(out).slice(0,2000);
    }
}