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
      var data = "new text"
      newfx(message,args,bot,data)
    }
    if(args[0]){
      //cut only dir
      let titlemsg = message.content.slice(6)
      let fiS = fs.readFile(`${defaultfile}/${titlemsg}`,"utf8",(err,data)=>{
        if(err) return message.channel.send(new discord.MessageEmbed().setTitle(`${titlemsg} doesnt exist`).setDescription("Please try again").setColor(0xFF3333))
        newfx(message,args,bot,data)
      })
    }
  }
}

let tempcache = []
let instance = []
let userstop = []
newfx(message,args,bot,data){
  //Text function goes here
  /*
  instance[message.author.id] = "0"; userstop[message.author.id] = "cont"
  */
  if(!instance[message.author.id] || instance[message.author.id] != "active"){
    let filter = m=>m.author.id == message.author.id && !message.author.bot
    let collector = new discord.MessageCollector(message.channel,filter)

    instance[message.author.id] == "active"

    collector.on("collect",(message,col)=>{
      args = message.content.split(" ")
      if(message.content){
        if(message.content.startsWith(":st")){
          if(!userstop[message.author.id] || userstop[message.author.id] == "cont"){
            userstop[message.author.id] = "stop"
            message.channel.send(new discord.MessageEmbed().setTitle("Stopped collecting texts!").setDescription("Run :st again to continue using text editor"))
          }
          else{
            userstop[message.author.id] = "cont"
            message.channel.send(new discord.MessageEmbed().setTitle("Started collecting texts!").setDescription("Run :st again to stop text editor"))
          }
        }

        if(!userstop[message.author.id] || userstop[message.author.id] == "cont"){
          tempcache[message.author.id] = message.content
          message.channel.send(new discord.MessageEmbed().setTitle(`${message.author.username}`).setDescription(`${tempcache[message.author.id]}`))
        }
      }
    })
  }
  else{
    return message.channel.send(new discord.MessageEmbed().setTitle("Your text editor instance is already on!").setDescription("Use that instance instead").setColor(0x33FFEC))
  }
}
