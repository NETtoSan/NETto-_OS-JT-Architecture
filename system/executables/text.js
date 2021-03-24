const Command = require('../base/programs')
const discord = require('discord.js')
const fs = require('fs')
let defaultfile = "./text"
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
    let owner = await message.client.fetchApplication().then(app=>app.owner.id)
    if(!args[0]) return message.channel.send(new discord.MessageEmbed().setTitle("This function is currently in development").setDescription("Please come back later!").setColor(0x33FFEC))
    if(args[0] == "new"){
      var data = "new text"
      var datadir = "New file"
      newfx(message,args,bot,data,datadir)
    }
    else if(args[0]){
      //cut only dir
      if(args[0].includes("../") && message.author.id != owner) return message.channel.send(new discord.MessageEmbed().setTitle("no u").setColor(0xFF3333))
      let titlemsg = message.content.slice(6)
      let fiS = fs.readFile(`${defaultfile}/${titlemsg}`,"utf8",(err,data)=>{
        if(err) return message.channel.send(new discord.MessageEmbed().setTitle(`${titlemsg} doesnt exist`).setDescription("Please try again").setColor(0xFF3333))
        datadir = titlemsg
        newfx(message,args,bot,data,datadir)
      })
    }
  }
}

let tempcache = []
let instance = []
let userstop = []

async function newfx(message,args,bot,data,datadir){
  //Text function goes here
  /*
  instance[message.author.id] = "0"; userstop[message.author.id] = "cont"
  */
  if(!instance[message.author.id] || instance[message.author.id] != "active"){
    let filter = m=>m.author.id == message.author.id && !message.author.bot
    let collector = new discord.MessageCollector(message.channel,filter)

    //data init
    instance[message.author.id] = "active"
    tempcache[message.author.id] = data
    //send a template
    message.channel.send(new discord.MessageEmbed().setTitle(`${datadir}`).setDescription(`${data}`).setColor(0x33FFEC))
    collector.on("collect",(message,col)=>{
      args = message.content.split(" ")
      if(message.content){
        console.log(data)
        console.log(tempcache[message.author.id])
        if(message.content.startsWith(":st")){
          if(!userstop[message.author.id] || userstop[message.author.id] == "cont"){
            userstop[message.author.id] = "stop"
            message.channel.send(new discord.MessageEmbed().setTitle("Stopped collecting texts!").setDescription("Run :st again to continue using text editor"))
          }
          else{
            userstop[message.author.id] = "cont"
            message.channel.send(new discord.MessageEmbed().setTitle("Started collecting texts!").setDescription("Run :st again to stop text editor"))
          }

          return
        }
        if(message.content.startsWith(":q")){
          if(message.content.startsWith(":q!")){
            return collector.stop()
          }
          if(datadir.toLowerCase() == "new file" && tempcache[message.author.id].toLowerCase == "new text"){
            message.channel.send(new discord.MessageEmbed().setTitle("Enter a file name to save").setColor(0x33FFEC))
          }
          else if(datadir){
            if(data != tempcache[message.author.id]){
              message.channel.send(new discord.MessageEmbed().setTitle("There are changes to the file").setDescription("You might want to save it\nTo force quit: run `:q!`").setColor(0x33FFEC))
            }
            else{
              return collector.stop()
            }
          }
          else{
            return collector.stop()
          }
          return
        }
        if(message.content.startsWith(":sv")){
          if(!args[1] && datadir.toLowerCase() == "new file") return message.channel.send(new discord.MessageEmbed().setTitle("Enter a file directory").setColor(0xFF3333))
          if(args[1]) {
            // statement
            data = tempcache[message.author.id]
            datadir = message.content.slice(args[0].length+1)
            return sv (message,args,bot,datadir,tempcache);
          }
          if(datadir){
            data = tempcache[message.author.id]
            return sv(message,args,bot,datadir,tempcache)
          }
        }
        if(!userstop[message.author.id] || userstop[message.author.id] == "cont"){
          tempcache[message.author.id] = message.content
          message.channel.send(new discord.MessageEmbed().setTitle(`${message.author.username}`).setDescription(`${tempcache[message.author.id]}`))
        }
      }
    })
    collector.on("end",()=>{
      instance[message.author.id] = "end"
      return message.channel.send(new discord.MessageEmbed().setTitle("Exit text editor!").setDescription("Good bye").setColor(0x33FFEC))
    })
  }
  else{
    return message.channel.send(new discord.MessageEmbed().setTitle("Your text editor instance is already on!").setDescription("Use that instance instead").setColor(0x33FFEC))
  }
}

async function sv(message,args,bot,datadir,tempcache){
  fs.writeFile(`${defaultfile}/${datadir}`,tempcache[message.author.id],(cache,err)=>{
    if(err) return console.log(err)
    return message.channel.send(new discord.MessageEmbed().setTitle("Saved!").setDescription("Saved texts").addField("Text",`${tempcache[message.author.id]}`).setColor(0x33FFEC))
  })
}

module.exports= text
