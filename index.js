const { Client, Collection } = require("discord.js");
const klaw = require("klaw");
const path = require("path");
const { readdirSync } = require("fs");

class NETto_OS extends Client {
  constructor(options) {
    super(options);

    this.config = require("./system/config/bot.json");
    this.programs = new Collection();
    this.aliases = new Collection();
  }
  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(
        this
      );
      console.log(`Loading command ${props.help.name}`, "log");
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
}

const bot = new NETto_OS();

function init() {
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
  console.log(`Loaded ${eventFiles.length} event files `, "log");
  eventFiles.forEach((file) => {
    const eventName = file.split(".")[0];
    console.log(`Loading event ${eventName}`);
    const evt = new (require(`./system/events/${eventName}`))(bot);

    bot.on(eventName, (...args) => evt.run(...args));
    delete require.cache[require.resolve(`./system/events/${file}`)];
  });
}

async function echeck(tokenString){
  //Simple fix but it works
  if(tokenString.toLowerCase().includes("enter")) return "---------- You did not enter your bot token here! ----------\nExiting......"
  try{
    bot.login(bot.config.token)
  }
  catch(e){
    return "---------- The bot failed to login! ----------\nExiting......."
  }
}

init();
