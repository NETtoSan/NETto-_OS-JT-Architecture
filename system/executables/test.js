const discord = require("discord.js");
const Command = require("../base/programs");

class test extends Command {
  constructor(bot) {
    super(bot, {
      name: "test",
      description: "Test a bot!",
      category: "System",
      usage: "!test",
      aliases: ["t"],
    });
  }
  async run(message, args, bot) {
    return message.channel.send(
      new discord.MessageEmbed()
        .setTitle(this.bot.user.username)
        .setDescription("This bot is running on JT architecture!")
        .setColor(0x33ffec)
    );
  }
}

module.exports = test;
