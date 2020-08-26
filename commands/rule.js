
module.exports = {
    help: "Print a server rule.",
    fullHelp: "rule <number>",
    execute: async (bot, msg, args) => {
        if (!args[0]) return `${msg.author.mention}: please enter a rule number to get!`;
        
        return { embed: {
            color: 0x3498db,
            author: {
                name: `Tupperbox Support Server Rule ${args[0]}`,
                url: `https://discord.com/channels/${process.env.guild}/${process.env.rules.split(",")[0]}/${process.env.rules.split(",")[1]}`,
                icon_url: bot.rules[args[0]-1] ? "https://cdn.discordapp.com/emojis/692189606245957643.png?v=1" : 'https://cdn.discordapp.com/emojis/698239917892829204.png?v=1',
            },
            description: bot.rules[args[0]-1] ?? "Couldn't find that rule."
        } };
    },
}