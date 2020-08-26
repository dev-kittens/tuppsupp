
module.exports = {
    help: `Update the rules for this server.`,
    fullHelp: "updaterules",

    rulesEmbed: {
        color: 0x3498db,
        "title": "Welcome to the support server!",
        "description": `Here's a few rules that must be followed to participate:\n`,
        fields: [
            {
                name: "Links",
                value: "Permanent server invite link: https://discord.gg/rHxMbt2\nClick [here](https://discordapp.com/oauth2/authorize?client_id=431544605209788416&scope=bot&permissions=536996928) to invite Tupperbox to your server!",
            },
            {
                name: "Getting Help",
                value: "**Please make sure you read <#513351613574938628> and <#486366088477540390> before asking for help!**\nWith a screenshot, or in the channel you're asking for help:\n\u25ab Show us what command you're having trouble with\n\u25ab Try to include which tupper is having issues",
            },
            {
                name: "Getting Access",
                value: "To access the rest of the channels, react ✅ to this message!",
            }
        ]
    },

    updateRulesJson: (bot) => {
        delete require.cache[require.resolve("../rules.json")];
        bot.rules = require("../rules.json");
    },

    execute: async (bot, msg, args) => {
        if (msg.author.id != msg.member.guild.ownerID) return bot.errText(`only the owner, <@${msg.member.guild.ownerID}>, may update the guild rule message.`);
        
        module.exports.updateRulesJson(bot);

        curEmbed = {...module.exports.rulesEmbed};
        bot.rules.forEach(rule => curEmbed.description += `${bot.rules.findIndex((x) => x == rule)+1}. ${rule}\n`);

        try {
            await bot.editMessage(process.env.rules.split(",")[0], process.env.rules.split(",")[1], { embed: curEmbed });
            return "Updated rules message!";
        } catch(e) {
            return bot.errText(msg, `could not update the rule message: ${e}!`);
        }
    },
}