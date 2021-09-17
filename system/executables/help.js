const Command = require("../base/programs");
const discord = require("discord.js");
class help extends Command {
  constructor(bot) {
    super(bot, {
      name: "help",
      description: "Helps a user know how to use a bot",
      aliases: ["h"],
      usage: "help [command]",
      category: "System",
    });
  }
  async run(message, args, bot) {
    if (!args[1]) {
      const progS = bot.programs.map((program) => program.help.name);
      const sysS = bot.programs.map((program) => program.help.category);

        const help = {}
        const files = {}
        bot.programs.forEach((command) => {
            const cat = command.help.category;
            if (!help.hasOwnProperty(cat)) help[cat] = []
            help[cat].push(command)
        })
        const embed = new discord.MessageEmbed().setTitle(bot.user.username).setDescription("How to use this bot properly \nUse help [command] to view more details of that command")
        for (const category in help) {
            for (const command of help[category]) {
                const cat = category
                if (!files.hasOwnProperty(cat)) files[cat] = []
                files[cat].push(command.help.name)
            }
            embed.addField(category, files[category].join(" , "))
        }

        embed.setColor(0x33FFEC)
        embed.setFooter("Syntaxes:\n<> Required\n[] Optional\n</> Multiple choices")
        return message.channel.send(embed)
    } else {
      let cmd = args[1];
      if (bot.programs.has(cmd)) {
        cmd = this.bot.programs.get(cmd);
        message.channel.send(
          new discord.MessageEmbed()
            .setTitle(cmd.help.name)
            .setDescription(cmd.help.description)
            .addField("Usage", cmd.help.usage)
            .addField("aliases", cmd.conf.aliases)
            .addField("Category", cmd.help.category)
            .addField("Permissions" , cmd.conf.permissions)
            .setColor(0x33ffec)
        );
      } else
        return message.channel.send(
          new discord.MessageEmbed()
            .setTitle(`*${cmd} not found`)
            .setDescription("Please try again")
            .setColor(0xff3333)
        );
    }
  }
}

module.exports = help;
