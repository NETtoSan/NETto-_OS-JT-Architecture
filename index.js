const {Client,Collection} = require('discord.js')
const discord = require('discord.js')
const klaw = require('klaw')
const path = require('path')
const fs = require('fs')

class NETOS extends Client{
    constructor(options){
        super(options)

        this.config = require('./system/config/bot.json')
        this.programs = new Collection()
        this.aliases = new Collection()
    }
    loadCommand(commandPath, commandName){
        try{
            const props = new(require(`${commandPath}${path.sep}${commandName}`))(this)
            console.log(`Loading command ${props.help.name}`,"log");
            props.conf.location = commandPath
            if(props.init){
                props.init(this)
            }
            this.programs.set(props.help.name,props)
            props.conf.aliases.forEach(alias=>{
                this.aliases.set(alias,props.help.name)
            })
            return false
        }
        catch(e){
            return `Unable to load ${commandName}: ${e}`
        }
    }
}

const bot = new NETOS

const init = async()=>{
    
    klaw('./system/executables').on("data",(item)=>{
        const pgFile = path.parse(item.path)
        if(!pgFile.ext || pgFile.ext !== ".js") return;
        const resp = bot.loadCommand(pgFile.dir,`${pgFile.name}${pgFile.ext}`)
        if(resp) console.error(resp)
    })

    const eventFiles = await fs.readdirSync("./system/events")
    console.log(`Loaded ${eventFiles.length} event files `,"log")
    eventFiles.forEach(file=>{
        const eventName = file.split(".")[0]
        console.log(`Loading event ${eventName}`)
        const evt = new (require(`./system/events/${eventName}`))(bot)

        bot.on(eventName,(...args)=> evt.run(...args))
        delete require.cache[require.resolve(`./system/events/${file}`)]
    })
}

init()
const log = async ()=>{
    await bot.login(bot.config.token)
    module.exports=bot
    try{
        const wserver = require('./system/webapplications/main')
    }catch(e){
        bot.channels.cache.get("739461324630917182").send(new discord.MessageEmbed().setTitle("WebJS Error").setDescription(error).setColor(0xFF3333))
    }
}
log()
bot.on("message",async message=>{
    let lw = await message.client.fetchApplication().then(app=>app.owner.id)
    if(message.content.startsWith("$$otw")){
        if(message.author.id  == lw) return message.channel.send(new discord.MessageEmbed().setTitle("You are the bot owner").setColor(0x33FFEC))
        else return message.channel.send(new discord.MessageEmbed().setTitle("You are NOT the bot owner").setColor(0xFF3333))
    }
    if(message.content.startsWith("$$dmbpgf")){
        let text = "yes u heard the title right"
        let uame = "NETtoSan"
        const embed = new discord.MessageEmbed().setTitle("/home/nettosan/Documents/i-love-panpan.txt")
        .setDescription(`File , edit , help\nCreated by ${uame}`)
        .addField("Text",text)
        .setFooter(`${text.length} words.\n**[TASKS]** index.js>exec>text>session0`)
        .setColor(0x33FFEC)
        return message.channel.send(embed)
    }
})
