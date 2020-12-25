const Command = require('../base/programs')
const discord = require('discord.js')
class help extends Command{
    constructor(bot){
        super(bot,{
            name:"help",
            description:"Helps a user know how to use a bot",
            aliases:["h"],
            usage:"help <command>",
            category:"System",

        })
    }
    async run (message,args,bot){
        if(!args[0]){
            const progS = bot.programs.map(program=>program.help.name)
            const sysS = bot.programs.map(program=>program.help.category)

            const embed = new discord.MessageEmbed().setTitle(bot.user.username).setDescription("How to use this bot properly \n ⚠️ This bot is using JT Architecture")
            .addField("Programs",progS.join('\n'), true).setColor(0x33FFEC)

            return message.channel.send(embed)
        }
        else{
            let cmd = args[0]
            if(this.bot.programs.has(cmd)){
                cmd = this.bot.programs.get(cmd)
                message.channel.send(new discord.MessageEmbed().setTitle(cmd.help.name).setDescription(cmd.help.description).addField("Usage",cmd.help.usage).addField("aliases",cmd.conf.aliases).addField("Category",cmd.help.category).setColor(0x33FFEC))
            } else return message.channel.send(new discord.MessageEmbed().setTitle(`*${cmd} not found`).setDescription("Please try again").setColor(0xFF3333))
        }
    }
}

module.exports=help