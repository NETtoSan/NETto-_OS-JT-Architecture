const Command = require('../base/programs')
const discord = require('discord.js')

class text extends Command{
  constructor(bot) {
    super(bot, {
      name: "text",
      description: "A text editor",
      category: "System",
      usage: "!text <file? 'name'/new>",
      aliases: ["txt"],
    });
  }
  async run (message,args,bot){
    return message.channel.send(new discord.MessageEmbed().setTitle("This function is currently in development").setDescription("Please come back later!").setColor(0x33FFEC))
  }
}
