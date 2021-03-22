const Command = require('../base/programs')
const discord = require('discord.js')
const fs = require('fs')
class text extends Command{
  constructor(bot) {
    super(bot, {
      name: "text",
      description: "A text editor",
      category: "System",
      usage: "!text <file? 'name'/new>",
      aliases: ["edit"],
    });
  }
  async run (message,args,bot){
    let defaultfile = "./text"
    if(!args[0]) return message.channel.send(new discord.MessageEmbed().setTitle("This function is currently in development").setDescription("Please come back later!").setColor(0x33FFEC))
    if(args[0] == "new"){
      return message.channel.send(new discord.MessageEmbed().setTitle("New file function"))

      return
    }
    if(args[0]){
      //cut only dir
      let titlemsg = message.content.slice(6)
      let fiS = fs.readFile(`${defaultfile}/${titlemsg}`,"utf8",(err)=>{
        if(err) return message.channel.send(new discord.MessageEmbed().setTitle(`${titlemsg} doesnt exist`).setDescription("Please try again").setColor(0xFF3333))
      })
    }
  }
}
