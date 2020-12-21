const Command = require("../base/programs")
const Discord = require('discord.js')
const {default :Axios} = require('axios')
class anime extends Command{
    constructor(bot){
        super(bot,{
            name:"anime",
            description:"weeb candyland",
            aliases:["weeb"],
            usage:"weeb [nsfw]",
            category:"Fun"
        })
    }
    async run (message,args,bot){
        if(!args[0]){
            try{
                function getRandomInt(max) {
                  return Math.floor(Math.random() * Math.floor(max));
                }
                console.log(getRandomInt(3));
                
              var _data = await (await Axios.get("https://www.reddit.com/r/Animewallpaper/random.json?include_over_18=off"))
              var data = _data.data.data.children[getRandomInt(24) + 1].data;
              var comments = _data.data.data.children;
              var post = new Discord.MessageEmbed()
                .setTitle(data.title).setColor('#ff007f').setURL("https://reddit.com" + data.permalink)
                .setImage(data.url).setFooter(`posted by ${data.author} | 💬 ${comments.length} 👍 ${data.ups} 👎 ${data.downs}`)
          
              message.channel.send(post)
            }
            catch(err){
              return message.channel.send(new Discord.MessageEmbed().setTitle("Error!").setDescription("Idfk how it caused but here " + err).setColor(0xFF3333))
            }
        }
        if(args[0] == "nsfw"){
            try{
                //message.channel.send(new Discord.MessageEmbed().setTitle("WARNING!").setDescription("NSFW filter is off!\nNETto!_OS will not be responsible for any damages and moderators cringeness").setColor(0xFF3333))
                function getRandomInt(max) {
                  return Math.floor(Math.random() * Math.floor(max));
                }
                console.log(getRandomInt(3));
                
              var _data = await (await Axios.get("https://www.reddit.com/r/Animewallpaper/random.json?include_over_18=on"))
              var data = _data.data.data.children[getRandomInt(24) + 1].data;
              var comments = _data.data.data.children;
              var post = new Discord.MessageEmbed()
                .setTitle(data.title).setColor('#ff007f').setURL("https://reddit.com" + data.permalink)
                .setImage(data.url).setFooter(`posted by ${data.author} | 💬 ${comments.length} 👍 ${data.ups} 👎 ${data.downs}`)
          
              message.channel.send(post)
            }
            catch(err){
              return message.channel.send(new Discord.MessageEmbed().setTitle("Error!").setDescription("Idfk how it caused but here " + err).setColor(0xFF3333))
            }
        }
    }
}

module.exports=anime