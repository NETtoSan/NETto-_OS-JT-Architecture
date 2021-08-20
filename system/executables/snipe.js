const Command = require('../base/programs')
const discord = require('discord.js')
var message

class snipe extends Command{
    constructor(bot){
        super(bot,{
            name:"snipe",
            description:"Gets a recently deleted message",
            usage:"snipe",
            aliases:["sni"],
            category:"Fun",
            permissions:"default",
            restrictChannel:"disabled"

        })
    }
    async run(message,args,bot){
        bot.snipe.get(message)
    }
}

module.exports=snipe
