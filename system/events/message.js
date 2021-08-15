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
    try{
      const cmd =
        this.bot.programs.get(command) ||
        this.bot.programs.get(this.bot.aliases.get(command));
      if (!cmd)
        return obsolete(message,this.bot)
      if (message.guild && !message.member)
        await message.guild.fetchMember(message.author);


      //Permission shit goes here
      /*
        <---- AS ALWAYS
              THIS WILL GET REPLACED WITH A NEW PERMISSION PARSING SYSTEM. PROBABLY TODAY OR WHEN I WAKE UP OR WHEN IM MOTIVATED TO DO SO

              BELOW THIS CODE WILL GET REPLACED WITH A PERMISSION PARSING SYSTEM. An execution class will be at ./system/Programs/permParsing.js (class permParsing{})

              ---->
              const permParsing = new(require('../programs/permParsing.js')) // Lets hope this works

              permParsing.runExec(message,args,bot,cmd)
                      ---->
      */
         //<---- Replace direct cmd.run Execution with the bot's CommandSync function.
       bot.commandSync(message,args,this.bot,cmd)
    }
    catch(e){
      return message.channel.send(new discord.MessageEmbed().setTitle("oh no").setDescription("Error executing program").addField("Error",`${e}`).setColor(0xFF3333))
    }
  }
};

function obsolete(message, bot) {
    try{
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
    catch(e){
      return message.channel.send(new discord.MessageEmbed().setTitle("Error executing program").setDescription("Something went wrong while executing old programs").addField("Error",`${e}`).setColor(0xFF3333))
    }
}
