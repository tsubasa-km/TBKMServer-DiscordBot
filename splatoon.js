const { EmbedBuilder,AttachmentBuilder  } = require('discord.js');
var request = require('request-promise');
const { splatoon_channelIds } = require('./config.json');

async function get_schedule(client,channel_id=null){
    var options = {
        url: 'https://spla3.yuu26.com/api/x/schedule',
        method: 'GET'
    }
    let data;
    await request(options)
            .then( (body) => {
                data = JSON.parse(body);
            })
    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${data.results[0].rule.name}`)
        .setTimestamp()
    const imgs = [
        new EmbedBuilder()
            .setTitle(`${data.results[0].stages[0].name}`)
            .setImage(`${data.results[0].stages[0].image}`),
        new EmbedBuilder()
            .setTitle(`${data.results[0].stages[1].name}`)
            .setImage(`${data.results[0].stages[1].image}`),
        ]
    if (channel_id){
        const channel = client.channels.cache.get(channel_id);
        channel.send({ embeds: [embed,...imgs] });
    }else{
        splatoon_channelIds.forEach(id_ => {
            const channel = client.channels.cache.get(id_);
            channel.send({ embeds: [embed] });
        })
    }
}

module.exports = { get_schedule }