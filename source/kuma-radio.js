const { createThread, JsonDBManager } = require("./util");

async function kumaRadioSubscribe(client, addDays = 0, channel_id = null) {
    let date = new Date();
    date.setDate(date.getDate() + addDays);
    if (channel_id) {
        createThread(client, channel_id, `クマラジ ${date.getMonth() + 1}.${date.getDate()}`);
        return;
    }
    let subscribe_channel_ids = await new JsonDBManager("subscribe-channel").read();
    subscribe_channel_ids["kuma-radio"].forEach(channel_id_ => {
        createThread(client, channel_id_, `クマラジ ${date.getMonth() + 1}.${date.getDate()}`);
    })
    delete date
}

module.exports = { kumaRadioSubscribe };