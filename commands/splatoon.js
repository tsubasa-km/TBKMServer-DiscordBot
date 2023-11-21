const { SlashCommandBuilder } = require('discord.js');
const { splatoonSubscribe } = require("../source/splatoon")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("splatoon")
        .setDescription("スプラトゥーン")
        .addSubcommand(option=>
            option.setName("setting")
                .setDescription("スプラトゥーンの情報についての設定"))
        .addSubcommand(option=>
            option.setName("schedule")
                .setDescription("スケジュールを取得")),
    execute: async (interaction,client) => {
        const operator = interaction.options.getSubcommand();
        if(operator === "schedule"){
            await interaction.reply("スプラトゥーンのスケジュールを表示します。");
            splatoonSubscribe(client,interaction.channel_id);
        }else{
            await interaction.reply(
                "設定は下記のURLからできます。\n"+
                "お気に入りのステージ :\n\thttp://winged-bear.com/wb-discord-bot/splatoon/stage-select/favorite\n"+
                "苦手なステージ : \n\thttp://winged-bear.com/wb-discord-bot/splatoon/stage-select/favorite");
        }
    }
}