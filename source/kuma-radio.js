const { createThread, JsonDBManager } = require("./util");

async function kumaRadioSubscribe(client, addDays = 0, channel_id = null) {
    let date = new Date();
    if (channel_id) {
        date.setDate(date.getDate() + addDays);
        createThread(client, channel_id, `クマラジ ${date.getMonth() + 1}.${date.getDate()}`);
        return;
    }
    let subscribe_channel_ids = await new JsonDBManager("subscribe-channel").read();
    console.log(subscribe_channel_ids["kuma-radio"]);
    subscribe_channel_ids["kuma-radio"].forEach(thread_channelId => {
        date.setDate(date.getDate() + addDays);
        createThread(client, thread_channelId, `クマラジ ${date.getMonth() + 1}.${date.getDate()}`);
    })
}

module.exports = { kumaRadioSubscribe };