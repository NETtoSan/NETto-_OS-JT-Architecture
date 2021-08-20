const discord = require('discord.js')
class snipe{
    constructor(bot){
        this.bot = bot
        this.allocation = []
    }

    push(message){
        console.log("executed!")
        if(message.author.bot) return;
        if(!this.allocation[message.channel.id]) { this.allocation[message.channel.id] = { e: message.content , u: message.author.username , ch: message.channel.id} }
        else { this.allocation[message.channel.id] = { e: message.content , u: message.author.username , ch: message.channel.id} }
    }
    async get(message){
        try{
          if(!this.allocation) return message.channel.send("nothing to read you dumb")
          if(this.allocation[message.channel.id].ch != message.channel.id) return
          message.channel.send(`*${this.allocation[message.channel.id].u}:* **${this.allocation[message.channel.id].e}**`)
        }
        catch(err){
          return console.log(err)
        }
    }
}

module.exports = snipe
