
module.exports = async (msg, bot) => {
    if (msg.author.bot) return;

    if (!msg.member && process.env.allow_private) 
      msg.member = await bot.getRESTGuildMember(process.env.guild, msg.author.id);



    let args = msg.content.trim().split(" ");
    if (args.length < 2 || args.shift() != process.env.prefix) 
      return;
    
    let cmd = bot.commands[args.shift()];
    if (!cmd) return;
    
    if (!msg.member || msg.member.guild.id != process.env.guild || !msg.member.roles.includes(process.env.role))
      return bot.addMessageReaction(msg.channel.id, msg.id, "\u274c");
    
    try { 
        await bot.createMessage(msg.channel.id, await cmd.execute(bot, msg, args)); 
    } catch (e) { 
        await bot.createMessage(msg.channel.id, `There was an error: "${e}"`); 
    }
}
