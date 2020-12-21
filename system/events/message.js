const discord = require('discord.js')
module.exports=class{
    constructor(bot){
        this.bot = bot
    }
    async run (message) {
        if(message.author.bot) return
        const prefixMention = new RegExp(`^<@!?${this.bot.user.id}> ?$`)
        if(message.content.match(prefixMention)) return message.channel.send(new discord.MessageEmbed().setTitle(this.bot.user.username).setDescription(`My prefix is ${this.bot.config.prefix}`).setColor(0x33FFEC))

        if(message.content.indexOf(this.bot.config.prefix) !== 0) return

        const args = message.content.slice(this.bot.config.prefix.length).trim().split(/ +/g)
        const command = args.shift().toLowerCase()
        console.log(command)
        if(!command) return message.channel.send(new discord.MessageEmbed().setTitle("Please enter a command name").setDescription("Otherwise a bot will not work").setColor(0xFF3333))
        const cmd = this.bot.programs.get(command) || this.bot.programs.get(this.bot.aliases.get(command))
        if(!cmd) return message.channel.send(new discord.MessageEmbed().setTitle("No command found!").setDescription("Please try again").setColor(0xFF3333))
        if(message.guild && !message.member) await message.guild.fetchMember(message.author)

        const bot = this.bot
        cmd.run(message,args,bot)
    }
}