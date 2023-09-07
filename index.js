const { Client, GatewayIntentBits, } = require('discord.js');
const { token, thread_channelIds } = require('./config.json');

const { deploy } = require("./deploy-commands")

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function createThread(addDays = 0,channel_id=null) {
    let date = new Date()
    console.log(addDays)
    if (channel_id) {
        const channel = client.channels.cache.get(channel_id);
        channel.threads.create({
            name: `クマラジ ${date.getMonth() + 1}.${date.getDate() + addDays}`,
            autoArchiveDuration: 60,
            reason: '',
        });
        return
    }
    thread_channelIds.forEach(thread_channelId=>{
        const channel = client.channels.cache.get(thread_channelId);
        channel.threads.create({
            name: `クマラジ ${date.getMonth() + 1}.${date.getDate() + addDays}`,
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

client.once('guildCreate', guild => {
    deploy(client,guild)
    console.log(`${guild.name} に参加しました。`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'radio') {
        createThread(0,interaction.channel.id)
        await interaction.reply("くまらじを作成します。")
        await new Promise(s => setTimeout(s, 5000))
        await interaction.deleteReply()
    }
    // if (commandName === 'schedule'){
    //     const cron = require('node-cron');
    //     cron.schedule('0 0 22 * * *', () => { createThread(1) });
    //     await interaction.reply("毎日22時にクマラジを作成します。")
    //     await new Promise(s => setTimeout(s, 5000))
    //     await interaction.deleteReply()
    // }
});

client.login(token);
