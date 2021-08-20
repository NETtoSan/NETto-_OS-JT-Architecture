const discord = require('discord.js')

module.exports= class{
    constructor(bot){
        this.bot = bot
    }
    async run(message){
        this.bot.snipe.push(message)
    }
}
