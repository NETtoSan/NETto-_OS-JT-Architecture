const { Client, Collection } = require("discord.js");
const klaw = require("klaw");
const path = require("path");
const chalk = require('chalk')
const { readdirSync } = require("fs");
const snipeCommand = require('./system/programs/snipe')

//Fuse this in i dont know... config file maybe
const RECOGNIZABLE_TYPE = ["LOADCMD","LOADEVT","ESYS","ECMD","ECRTCL"]
class NETto_OS extends Client {
  constructor(options) {
    super(options);

    this.config = require("./system/config/bot.json");
    this.programs = new Collection();
    this.aliases = new Collection();
    this.guild = []
    this.permparse = require("./system/programs/permParsing")
    this.snipe = new snipeCommand()
    this.exec = {
      parse: async (message,args,bot,app) => {new(require('./system/programs/permParsing'))().check(message,args,bot,app)},
      commandParsing: async (message,args,bot,app) => {

      }
    }
  }
  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(
        this
      );
      this.consoleLogging(["LOADCMD",`${props.help.name}`])
      props.conf.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.programs.set(props.help.name, props);
      props.conf.aliases.forEach((alias) => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load ${commandName}: ${e}`;
    }
  }
  async getGuildAlias(message,args,bot){
       try{
           let EGUILD = bot.guilds.cache.get(args[1]) || bot.guilds.cache.find(guild=>guild.name.toLowerCase().includes(args[1]))
           return EGUILD? EGUILD : null
       }
       catch(err){
           return message.channel.send(new discord.MessageEmbed().setTitle(`${new String(err)}`).setColor(0xFF3333))
       }
   }
  async getMemberAlias(message,args,bot){
       //A better way to get user contents. Without having to add a user checkup code in every file
       try
       {
           let EMEMBER = message.guild.members.cache.get(args[1]) || message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase().includes(args[1]))
           return EMEMBER? EMEMBER : null
       }
       catch(err) {
           return message.channel.send(new discord.MessageEmbed().setTitle(`${new String(err)}`).setColor(0xFF3333))
       }
   }
  consoleLogging(data){
    let HEADER = RECOGNIZABLE_TYPE.find(TYPE => TYPE == data[0]) ? data[0] : "UNKNOWN"
    let CONTEXT = data[1] ? data[1] : "UNKNOWN"
    console.log(`${chalk.bgCyan(HEADER)} ${CONTEXT}`)
  }
}

const bot = new NETto_OS();

async function init() {
  klaw("./system/executables").on("data", (item) => {
    const pgFile = path.parse(item.path);
    if (!pgFile.ext || pgFile.ext !== ".js") return;
    const resp = bot.loadCommand(pgFile.dir, `${pgFile.name}${pgFile.ext}`);
    if (resp) console.error(resp);
  });

  //Check token FIRST before laoding an event and possibly logging in to discord
  let ECHECK = await echeck(bot.config.token)
  if(ECHECK) process.exit()
  const eventFiles = readdirSync("./system/events");
  bot.consoleLogging(["LOADEVT",`${eventFiles.length}`])
  eventFiles.forEach((file) => {
    const eventName = file.split(".")[0];
    bot.consoleLogging([`LOADEVT`,`${eventName}`]);
    const evt = new (require(`./system/events/${eventName}`))(bot);

    bot.on(eventName, (...args) => evt.run(...args));
    delete require.cache[require.resolve(`./system/events/${file}`)];
  });
}

async function echeck(tokenString){
  //Simple fix but it works
  if(tokenString.toLowerCase().includes("enter")) return "---------- You did not enter your bot token here! ----------\nExiting......"
  try{
    await bot.login(bot.config.token)
  }
  catch(e){
    return "---------- The bot failed to login! ----------\nExiting......."
  }
}

init();
