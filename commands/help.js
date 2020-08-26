
module.exports = {
    help: "Print this message, or get help for a specific command",
    fullHelp: [
        "help - Print the list of commands",
        "help <command> - Get help on a specific command"
    ],

    makeHelpEmbed: (bot, msg, name, value) => {
        this.author = {
            name: "Tupp Supp Command Help",
            icon_url: (Math.random() * 10) > 7 ? `https://cdn.discordapp.com/emojis/698257497546555397.png?v=1` : `https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.png`,
        };

        this.fields = [{ name: name, value: value }];
        this.timestamp = new Date().toJSON();
        this.footer = { text: `Brought to ${msg.author.username}#${msg.author.discriminator} with love` };

        return this;
    },

    execute: async (bot, msg, args) => {

        commandList = [];
        
        Object.keys(bot.commands).forEach(cmd => { commandList.push(`${process.env.prefix} ${cmd} - ${bot.commands[cmd].help}`); })

        if (args.length == 0) return { embed: module.exports.makeHelpEmbed(bot, msg, "Command List", commandList.join("\n")) };
        
        cmd = args.shift();
        if (!bot.commands[cmd]) return "Could not find command.";
        
        let helpString = "";
        if (Array.isArray(bot.commands[cmd].fullHelp)) bot.commands[cmd].fullHelp.forEach(cmd => {
            helpString += process.env.prefix + cmd + "\n"
        });
        else helpString = cmd != "dev" ? process.env.prefix : "" + bot.commands[cmd].fullHelp;

        return { embed: module.exports.makeHelpEmbed(bot, msg, "Usage", helpString) };
    }
}