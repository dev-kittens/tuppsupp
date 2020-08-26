const { brotliCompress } = require("zlib");

const tagSubcommands = ['create', 'update', 'remove'];

module.exports = {
    help: "Tag commands",
    fullHelp: [
        "tag <name> - Get the value of a tag by name",
        "tag create <name> <content> - Create a new tag with the specified name and content",
        "tag update <name> <new-content> - Update a tag's content",
        "tag remove <name> - Remove a tag by name"
    ],
    execute: async (bot, msg, args) => {
        args = bot.getMatches(msg.content.split(" ").slice(1).join(" "), /“(.+?)”|‘(.+?)’|"(.+?)"|'(.+?)'|(\S+)/gi).slice(1);

        if (args.length < 1) return await bot.commands.help.execute(bot, msg, ["tag"]);

        let arg = (tagSubcommands.includes(args[0])) ? args.shift() : 'h';

        if (arg == "create" || arg == "update") {
            if (args.length < 1) return bot.errText(msg, `please provide a tag name.`);
            let tagName = args.shift();
            if (args.length < 1) return bot.errText(msg, `please provide some content for this tag.`);
            old = await bot.db.tags.get(tagName);
            await bot.db.tags.set(tagName, args.join(" "));
            let notUpdated = (!old || old.text == args.join(" "));
            return `Tag with name ${tagName}'s content set! ${!notUpdated ? `\n\nFormer tag content: ${old.text}` : ''}`;
        }

        else if (arg == "remove") {
            if (args.length < 1) return bot.errText(`please provide a tag name.`);
            let tagName = args.shift();
            old = await bot.db.tags.get(tagName);
            await bot.db.tags.del(tagName);
            return `${old ? `<:emoji:${process.env.empty_emoji}>` : ''}Data expunged. ${old ? `\n\nFormer tag value: ||${old.text}||` : "\n... Oh wait, there was nothing there to expunge anyways. (Maybe you made a typo?)"}`;
        }

        else {
            text = await bot.db.tags.get(msg.content.split(" ").slice(2).join(" "));
            return { embed: {
                description: text ? text.text : 'undefined'
            } };
        };
    }
}