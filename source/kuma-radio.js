const { createThread, JsonDBManager } = require("./util");

function kumaRadioSubscribe(client, addDays = 0, channel_id = null) {
    let date = new Date();
    if (channel_id) {
        date.setDate(date.getDate() + addDays);
        createThread(client, channel_id, `クマラジ ${date.getMonth() + 1}.${date.getDate()}`);
        return;
    }
    thread_channelIds = new JsonDBManager("subscribe-channel").read();
    thread_channelIds.forEach(thread_channelId => {
        date.setDate(date.getDate() + addDays);
        createThread(client, thread_channelId, `クマラジ ${date.getMonth() + 1}.${date.getDate()}`);
    })
}

module.exports = { kumaRadioSubscribe }