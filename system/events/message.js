const discord = require("discord.js");
module.exports = class {
  constructor(bot) {
    this.bot = bot;
  }
  async run(message){
    let bot = this.bot
    let PREFIX = bot.config.prefix
    if(message.author.bot) return
    let args = message.content.substring(bot.config.prefix.length).split(/ +/g)
    //Mention greetings
    if(message.content.match(RegExp(`^<@!?${bot.user.id}>( |)`))){
      /*
      Simple chatbot later
      if(args[1]){
            let chat = new Chat(message.content)
            return //chatbot code here
      }
      */
      return message.channel.send(new discord.MessageEmbed().setTitle(`${bot.user.username}`).setDescription("A NETto!_NT Development project discord bot\nGet the bot source code [here!](https://github.com/NETtoSan/NETto-_OS-JT-Architecture)").setColor(0x33FFEC))
    }
    if(!message.content.startsWith(PREFIX)) return
    if(message.channel.type == "dm") return message.channel.send("You cannot use this bot in DMs!")

    const apps = bot.programs.get(args[0]) || bot.programs.find(program=>program.conf.aliases.includes(args[0]))
    if(!apps){
      //return message.channel.send("App not found!")
      return
    }
    try{
      console.log("brrrrr")
      if(apps.conf.restrictChannel == "default" && message.channel.name.toLowerCase().includes("bot")){
        try{
          if(apps.conf.guildOnly !== true) {console.log("app exec") ;return bot.exec.parse(message,args,bot,apps)}
        }
        catch(err){
          console.log(err)
        }
      }
      if(apps.conf.restrictChannel == "disabled") return bot.exec.parse(message,args,bot,apps)
    }
    catch(err){
      console.log(err)
    }
  }
};
