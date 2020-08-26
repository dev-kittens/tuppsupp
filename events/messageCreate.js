
module.exports = async (msg, bot) => {
    if (msg.author.bot) return;

    if (!msg.member && process.env.allow_private) 
      msg.member = await bot.getRESTGuildMember(process.env.guild, msg.author.id);

    if (!msg.member || msg.member.guild.id != process.env.guild || !msg.member.roles.includes('722973436074262599'))
      return bot.addMessageReaction(msg.channel.id, msg.id, "\u274c");

    let args = msg.content.trim().split(" ");
    if (args.length < 2 || args.shift() != process.env.prefix) 
      return;
    
    let cmd = bot.commands[args.shift()];
    if (!cmd) return;
    
    try { 
        await bot.createMessage(msg.channel.id, await cmd.execute(bot, msg, args)); 
    } catch (e) { 
        await bot.createMessage(msg.channel.id, `There was an error: "${e}"`); 
    }
}