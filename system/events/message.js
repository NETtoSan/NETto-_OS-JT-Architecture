const discord = require("discord.js");
module.exports = class {
  constructor(bot) {
    this.bot = bot;
  }
  async run(message) {
    if (message.author.bot) return;
    const prefixMention = new RegExp(`^<@!?${this.bot.user.id}> ?$`);
    if (message.content.match(prefixMention))
      return message.channel.send(
        new discord.MessageEmbed()
          .setTitle(this.bot.user.username)
          .setDescription(`My prefix is ${this.bot.config.prefix}\nA development bot by NETto. AKA. A development platform for NETSU Cloud\nGet a repository [here](https://github.com/NETtoSan/NETto-_OS-JT-Architecture)`)
          .setColor(0x33ffec)
      );

    if (message.content.indexOf(this.bot.config.prefix) !== 0) return;

    const args = message.content
      .slice(this.bot.config.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log(command);
    if (!command)
      return message.channel.send(
        new discord.MessageEmbed()
          .setTitle("Please enter a command name")
          .setDescription("Otherwise a bot will not work")
          .setColor(0xff3333)
      );
    const cmd =
      this.bot.programs.get(command) ||
      this.bot.programs.get(this.bot.aliases.get(command));
    if (!cmd)
      return obsolete(message,this.bot)
    if (message.guild && !message.member)
      await message.guild.fetchMember(message.author);


    //Permission shit goes here
        const bot = this.bot
        let perm = cmd.conf.permissions
        let lw = await message.client.fetchApplication().then(app=>app.owner.id)
        //Logic shits
        if(!perm) return message.channel.send(new discord.MessageEmbed().setTitle("Permission error on JS").setDescription("Check ./system/base and ./system/executables").setColor(0xFF3333))
        if(perm == "default") {
            return cmd.run(message,args,bot)
        }
        if(perm == "OWNER" && message.author.id == lw) {
            return cmd.run(message,args,bot)
        }
        const uperm = await message.member.permissions.has(perm)
        console.log(uperm)
        if(uperm) {
            if(perm == "OWNER") return message.channel.send(new discord.MessageEmbed().setTitle("Access denied!").setDescription(`This program required role of ${perm}`).setColor(0xFF3333))
            return cmd.run(message,args,bot)
        }
        else return message.channel.send(new discord.MessageEmbed().setTitle("Access denied!").setDescription(`This program required role of ${perm}`))

  }
};


function obsolete(message, bot) {
    const args = message.content.substring(bot.config.prefix.length).split(" ")
    try {
        bot.carryover.get(args[0]).execute(message, args, bot)
    }
    catch (err) {
        let reve = bot.programs.map(command => command.help.name)
        let content = message.content.substring(bot.config.prefix.length).split(" ")
        var context = `Please try again!`
        for (const e of reve) {
            let ARGS = new RegExp(`${e}`)
            if (content[0].match(ARGS)) {

                context = `Do you mean ${e}?`
            }
            if (e.includes(content[0])) {
                context = `Do you mean ${e}?`
            }
        }
        return message.channel.send(new discord.MessageEmbed().setTitle("No command found!").setDescription(context).setColor(0xFF3333))
    }
}
