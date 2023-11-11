const { SlashCommandBuilder } = require('discord.js');

const { JsonDBManager } = require("../source/util");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("channel")
        .setDescription("チャンネルの設定をします。")
        .addSubcommandGroup(subcommandgroup=>
            subcommandgroup
                .setName("set")
                .setDescription("選択してください。")
                .addSubcommand(subcommand=>
                    subcommand
                    .setName('kuma-radio')
                    .setDescription('定期的にクマラジのスレッドを作成します。'))
                .addSubcommand(subcommand=>
                    subcommand
                    .setName('splatoon-info')
                    .setDescription('定期的にスプラトゥーンのルール、ステージ情報を送信します。')))
        .addSubcommandGroup(subcommandgroup=>
            subcommandgroup
                .setName("remove")
                .setDescription("選択してください。")
                .addSubcommand(subcommand=>
                    subcommand
                    .setName('kuma-radio')
                    .setDescription('定期的なクマラジのスレッド作成を停止します。'))
                .addSubcommand(subcommand=>
                    subcommand
                    .setName('splatoon-info')
                    .setDescription('定期的なスプラトゥーンのルール、ステージ情報の送信を停止します。'))),
    execute: async (interaction) => {
        const db = new JsonDBManager("regular");
        const channel_id = interaction.channel.id;
        const operator = interaction.options.getSubcommand();
        var msg = "設定しました。";
        if (interaction.options.getSubcommandGroup() === "set"){
            db.write(json_data=>{
                json_data[operator]
                    .push(channel_id);
                json_data[operator] = [...new Set(json_data[operator])]
                return json_data;
            });
        }else{
            db.write(json_data=>{
                json_data[operator] =
                    json_data[operator].filter(c_id=>{
                        if(c_id != channel_id)return c_id;
                    });
                return json_data;
            });
        }
        console.log(interaction.options.getSubcommand())
        await interaction.reply(msg);
    }
}