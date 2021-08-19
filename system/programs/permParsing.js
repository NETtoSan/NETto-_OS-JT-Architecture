const discord = require('discord.js')
class permParsing{
  constructor(bot){
    this.validiator = []
    this.bot
  }

  async check(message,args,bot,app){
    this.bot = bot
    const esfx = async () =>{
      const permexec = await this.permparse(message,args,bot,app)
      if(permexec){
        switch(permexec){
          case "nopass":
            return message.channel.send(new discord.MessageEmbed().setTitle("No permission!").setDescription(`This command is restricted to ${app.config.permissions}`).setColor(0xFF3333))
          break
          case "pass":
          console.log("pass")
            return app.run(message,args,bot)
          break
        }
      }
    }
    await esfx()
  }
  async permparse(message,args,bot,app){
    console.log("WORK SHIT")
    //Check NETto!_NT dev variations
    if(app.conf.ntEquivalent !== "NETto!_NT dev") return message.channel.send(new discord.MessageEmbed().setTitle("This is NETto!_NT 8.0 command").setDescription("Wait until NETto writes a command for cross-javascript capable bot").setColor(0xFF3333))
    if(app.conf.permLevel){
      console.log("hmmm")
      let EPERM = app.conf.permLevel
      if(EPERM.toLowerCase().includes("user") || EPERM.toLowerCase().includes("default")) return "pass"
      if(EPERM.toLowerCase() == "moderators"){
        let EVALID = message.member.roles.find(role=>role.name.toLowerCase().includes("moderator") || (bot.guild[message.guild.id] && bot.guild[message.guild.id].modrole && (role.name.toLowerCase() == bot.guild[message.guild.id].modrole || role.id == bot.guild[message.guild.id].modrole)))
        if(!EVALID) return "nopass"
        return "pass"
      }
      if(EPERM.toLowerCase() == "owner"){
        let OWNERID = await bot.fetchApplication().then(app=>app.owner.id)
        if(message.author.id != OWNERID) return "nopass"
        return "pass"
      }
    }
  }
}



module.exports = permParsing
