const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("splatoon")
        .setDescription("スプラトゥーン")
        .addSubcommand(option=>
            option.setName("setting")
                .setDescription("スプラトゥーンの情報についての設定")),
    execute: async (interaction,client) => {
        const operator = interaction.options.getSubcommand();
        await interaction.reply(
            "設定は下記のURLからできます。\n"+
            "お気に入りのステージ :\n\thttp://winged-bear.com/wb-discord-bot/splatoon/stage-select/favorite\n"+
            "苦手なステージ : \n\thttp://winged-bear.com/wb-discord-bot/splatoon/stage-select/favorite");
    }
}