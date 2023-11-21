const { SlashCommandBuilder } = require('discord.js');
const { kumaRadioSubscribe } = require("../source/kuma-radio")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("radio")
        .setDescription("クマラジを作成します。")
        .addStringOption(option =>
            option.setName("when")
                .setDescription("オプション")
                .addChoices(
                    { name: 'Today', value: 'Today' },
                    { name: 'Tomorrow', value: 'Tomorrow' })),
    execute: async (interaction, client) => {
        let option_ = interaction.options.getString("when") ?? "Today";
        await interaction.reply("クマラジを作成します。");
        await new Promise(s => setTimeout(s, 1000));
        await interaction.deleteReply();
        if (option_ == "Today") {
            kumaRadioSubscribe(client, 0, interaction.channel.id);
        } else if (option_ == "Tomorrow") {
            kumaRadioSubscribe(client, 1, interaction.channel.id);
        }
    }
}