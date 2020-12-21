const discord = require('discord.js')
const fs = require('fs')
const Command = require('../base/programs')
class cd extends Command{
    constructor(bot){
        super(bot,{
            name:"cd",
            description:"Reads a folder through directory",
            aliases:["ls"],
            usage:"cd <directory>",
            category:"System"
        })
    }
    async run (message,args,bot){
        if(!args[0]) return message.channel.send(new discord.MessageEmbed().setTitle("No directory").setDescription("Please enter a file directory\nExamples: cd ./").setColor(0xFF3333))
        const dir = message.content.slice("4")
        const file = fs.readdirSync(dir)
        const emb = new discord.MessageEmbed().setTitle(dir).setDescription("Containing folders").addField("Files",file).setColor(0x33FFEC)
        return message.channel.send(emb)
    }
}
module.exports=cd