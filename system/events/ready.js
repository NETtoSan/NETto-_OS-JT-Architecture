module.exports = class {
  constructor(bot) {
    this.bot = bot;
  }

  async run() {
      console.log(`------- STAT -------`)
      console.log(`Programs: ${this.bot.programs.size}\nCarriedover programs: ${this.bot.carryover.size}`)
      console.log(`------- Bot is ready! -------`)
  }
};
