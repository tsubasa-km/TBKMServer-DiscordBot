const { Client, GatewayIntentBits } = require('discord.js');
const { token, thread_channelIds } = require('./config.json');

const { deploy } = require("./source/deploy-commands");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function createThread(addDays = 0, channel_id = null) {
    let date = new Date()
    console.log(addDays)
    if (channel_id) {
        const channel = client.channels.cache.get(channel_id);
        date.setDate(date.getDate() + addDays);
        channel.threads.create({
            name: `クマラジ ${date.getMonth() + 1}.${date.getDate()}`,
            autoArchiveDuration: 60,
            reason: '',
        });
        return;
    }
    thread_channelIds.forEach(thread_channelId => {
        const channel = client.channels.cache.get(thread_channelId);
        date.setDate(date.getDate() + addDays);
        channel.threads.create({
            name: `クマラジ ${date.getMonth() + 1}.${date.getDate()}`,
            autoArchiveDuration: 60,
            reason: '',
        });
    })
}

client.once('ready', () => {
    deploy(client)
    const cron = require('node-cron');
    cron.schedule('0 0 22 * * *', () => { createThread(1) });
    console.log('Ready!');
});

client.on('guildCreate', guild => {
    deploy(client, guild)
    console.log(`${guild.name} に参加しました。`)
})

client.on('threadCreate', async thread => {
    if (thread.name.includes("クマラジ")) {
        thread.send("クマラジ!!")
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    switch (commandName){
        case "radio":{
            await interaction.reply("クマラジを作成します。");
            await new Promise(s => setTimeout(s, 1000));
            await interaction.deleteReply();
            createThread(0, interaction.channel.id);
            break;
        }
    }
});

client.login(token);
