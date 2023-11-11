const { SlashCommandBuilder } = require('discord.js');
const {createKumaRadio} = require("../source/kuma-radio")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("radio")
        .setDescription("クマラジを作成します。"),
    execute: async (interaction,client) => {
        await interaction.reply("クマラジを作成します。");
        await new Promise(s => setTimeout(s, 1000));
        await interaction.deleteReply();
        createKumaRadio(client,0, interaction.channel.id);
    }
}