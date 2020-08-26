const fs = require("fs");

module.exports = bot => {

    bot.load = name => {
        if (bot[name] === undefined) bot[name] = {}
        fs.readdirSync("./" + name).forEach(f => {
            if (bot[name][f.slice(0, -3)]) delete require.cache[require.resolve(`./${name}/${f}`)];
            try { bot[name][f.slice(0, -3)] = require(`./${name}/${f}`); }
            catch (err) { console.log(`Error loading ${name.slice(0, -1)} ${f.slice(0, -3)}: ${err}`) }
        });
        return `Finished loading ${name}. Check your console for errors.`
    };

    bot.matchMentionUser = async (mentionString) => {
        let mention = mentionString.match(/^<@!?(\d+)>$/);
        try {return await bot.getRESTUser(mention ? mention[1] : mentionString); }
        catch (e) { return null; }
    };

    bot.matchMentionChannel = async (mentionString, guildId) => {
        let mention = mentionString.match(/^<#(\d+)>$/);
        let channel;
        try { channel = await bot.getRESTChannel(mention ? mention[1] : mentionString); } catch (e) { return null; }
        if (channel && channel.guild.id == guildId) return channel;
        return null;
    };

    bot.msgEmbed = (msg, type) => {
        lines = msg.content.split("\n");
    
        this.color = 0x3498db;

        title = lines.shift()
        this.author = {
            name: title.substring(4, title.length - 2),
            url: `https://discord.com/channels/${process.env.guild}/${process.env[type]}/${msg.id}`,
            icon_url: "https://cdn.discordapp.com/emojis/692189606245957643.png?v=1",
        }

        this.description = lines.join("\n");
    
        return { embed: this };
    };

    bot.errText = (msg, text) => 
        `<:emoji:${process.env.error_emoji}> ${msg.author.mention}, ${text}`;

    // yeah, I did casually steal this from tupperbox, but y'know
    bot.getMatches = (string, regex) => {
        var matches = [];
        var match;
        while (match = regex.exec(string)) {
            match.splice(1).forEach(m => { if(m) matches.push(m); });
        }
        return matches;
    };

}