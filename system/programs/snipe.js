
let ARRAY
class snipe{
  constructor(bot){

  }
  push(msid,ctx,msu){
    ARRAY[`${msid}`] = `*${msu}*:: ${ctx}`
  }
  read(message,args,bot){
    if(!ARRAY[`${message.channel.id}`]) return message.channel.send(`Nothing to read`)
    message.channel.send(ARRAY[`${message.channel.id}`])
  }
}


module.exports = snipe
