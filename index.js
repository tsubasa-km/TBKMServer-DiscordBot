const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');

const { token } = require('./config.json');
const { webpage } = require("./webpage");
const { deploy } = require("./source/deploy-commands");
const { splatoonSubscribe } = require("./source/splatoon");
const { kumaRadioSubscribe } = require("./source/kuma-radio");
const commands = [
    require("./commands/radio"),
    require("./commands/channel"),
    require("./commands/splatoon"),
];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    // コマンド登録
    deploy(client, commands.map(cmd => cmd.data));
    // 定期実行開始
    cron.schedule('0 0 22 * * *', () => { kumaRadioSubscribe(client) });
    cron.schedule('0 30 9 * * *', () => { splatoonSubscribe(client) });
    console.log('Ready!');
});

client.on('guildCreate', guild => {
    deploy(client, guild);
    console.log(`${guild.name} に参加しました。`);
})

client.on('threadCreate', async thread => {
    // クマラジの場合
    if (thread.name.includes("クマラジ")) {
        thread.send("クマラジ!!");
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    // スラッシュコマンド
    commands.forEach(cmd => {
        if (cmd.data.name === commandName) {
            cmd.execute(interaction, client);
        }
    });
});

client.login(token);
webpage()