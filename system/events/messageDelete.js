//Snipe command
//Now i just need something that works. Beauty and critics prevention code will come later :)

const snipe = new(require('../'))
module.exports = class {
  constructor(bot) {
    this.bot = bot;
  }

  async run(message) {
    let ctx = message.content
    let msu = message.author.username
    let msid = message.channel.msid


    console.log("This has been executed!")
    snipe.push(msid,ctx,msu)
  }
};
