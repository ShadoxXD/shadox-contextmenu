const { Client, Collection } = require("discord.js");
const mongoose = require('mongoose');
    const database = require('quick.db');
	
    const Discord = require("discord.js");

const client = new Client({
    intents: 32767, 
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config");

let veri = database.get("firstsetup") || false
if(veri == true){
}else{
    
        
        
        console.log("Shadox x)")
}
mongoose.connect(client.config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log(`              Mongoya Bağlanıldı`))
console.log(`///////////////////////////////////////////////////`)
require("./handler")(client);

client.login(client.config.token);





client.on('ready', () => {
    client.guilds.cache.forEach(guild => {
    guild.members.cache.forEach(async member => {
    const fetch = await database.fetch(member.user.id);
	const config = ("config.js")
    if(!fetch) return;
    if((Date.now() <= fetch.end) || fetch) {
    let kalan = fetch.end - Date.now();
	let muted = (client.config.roles.muted)
    let logChannelID = '880503311919353986'; 
    let logChannel = await guild.channels.cache.get(logChannelID);
    setTimeout(() => {
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN').setTitle('Susturulması açıldı.').setDescription(`**• Yetkili**: <@!${fetch.moderatorID}>
    **• Susturulan**: <@!${member.user.id}>
    **• Sebep**: ${fetch.reason}`)
    .setAuthor(fetch.moderatorUsername, fetch.moderatorAvatarURL)

    return member.roles.remove(muted).then(() => database.delete(member.user.id) && logChannel.send({embeds: [embed]}))
    }, kalan);
    };
    });
    });
    });