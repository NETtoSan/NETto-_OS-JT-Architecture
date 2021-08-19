const discord = require("discord.js");
module.exports = class {
  constructor(bot) {
    this.bot = bot;
  }
  async run(message){
    let bot = this.bot
    if(message.author.bot) return

    let args = message.content.substring(bot.config.prefix.length).split(/ +/g)
    
  }
};
//Delete this one. In this doesnt work
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
