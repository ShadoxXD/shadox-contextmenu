const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const moment = require('moment')
moment.locale("tr");
const ms = require("ms");
const config = ("./config.js")
const database = require('quick.db');
const Discord = require("discord.js");
module.exports = {
    name: "Küfür: 10dk",
    description: "Bir kişiyi Spam / Flood sebebiyle mutelersiniz.",
    type: 'USER',
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.member.roles.cache.has(client.config.yetki.muteStaff) && !interaction.member.permissions.has("ADMINISTRATOR")){
            return interaction.reply({content: "Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin"})
        }
			let muted = (client.config.roles.muted)
        const user = await interaction.guild.members.cache.get(interaction.targetId)
        interaction.followUp({ content: `<:Susturuldu:880513655660220446> <@${user.id}> kullanıcısı susturuldu.`})
        user.roles.add(muted)
        let end = Date.now() + ms("10 minutes") 

        database.set(user.id, { 
            end: end,
            start: Date.now(),
            moderatorUsername: interaction.member.user.username,
            moderatorID: interaction.member.id,
            moderatorAvatarURL: interaction.member.user.displayAvatarURL,
            reason: "Küfür: 10dk"
            });
            database.add(`cezaid`, 1)
            let veri = database.get(`cezaid`) || 1

        let channel = interaction.guild.channels.cache.get(client.config.logs.mutelog)
        let embed = new MessageEmbed().setAuthor(client.config.embed.sunucuAdı, interaction.guild.iconURL({dynamic: true}))
        .setDescription(`${user} kullanıcısı metin kanallarında ${interaction.user} tarafından **10 dakika** boyunca susturulmuştur.\n\nMute Atılış Tarihi: \`${moment(Date.now()).format("LLL")}\`\nMute Bitiş Tarihi: \`${moment(Date.now() + ms("10m")).format("LLL")}\` \n Ceza Puanı \`(#${veri})\``)
        .setFooter(client.config.embed.authorTag)
        .setColor("RANDOM")
        channel.send({ embeds: [embed]})


        setTimeout(() => {
            const embed = new Discord.MessageEmbed()
            .setColor('GREEN').setTitle('Susturulması açıldı.').setDescription(`**• Yetkili**: <@!${interaction.member.id}>
            **• Susturulan**: ${user}
            **• Sebep**: Spam / Flood`)
            .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL({ dynamic: true }))
        
            return user.roles.remove(muted).then(() => database.delete(user.id) && channel.send({embeds: [embed]}))
            }, ms("10 minutes"));
    }
};
