const request = require("request");
const {JsonDBManager} = require("../source/util");

module.exports = {
async splatoonSubscribe(client,channel_id=null){
    const api_url = "https://api.koukun.jp/splatoon/3/schedules"
    const spla_data = await new JsonDBManager("spla-data").read();
    const response = await new Promise((resolve, reject) => {
        request(api_url, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
    const schedule = JSON.parse(response);
    var xmatch_schedule = schedule.xmatch;
    var value_schedule = [];
    xmatch_schedule.forEach(s => {
        // 苦手なステージがある場合
        if (spla_data.stage.unfavorite.includes(s.stage[0].name) ||
            spla_data.stage.unfavorite.includes(s.stage[1].name)){
            return;
        }
        // お気に入りのステージがある場合
        if (spla_data.stage.favorite.includes(s.stage[0].name) ||
            spla_data.stage.favorite.includes(s.stage[1].name)){
            value_schedule.push(s)
        }
    })
    if (channel_id){
        const channel = client.channels.cache.get(channel_id);
        value_schedule.forEach(s => {
            channel.send(`${s.rule.name}:${s.start} ${s.stage[0].name}, ${s.stage[1].name}`);
        });
        return;
    }
    const subscribe_channels = await new JsonDBManager("subscribe-channel").read();
    subscribe_channels["splatoon-info"].forEach(cid => {
        const channel = client.channels.cache.get(cid);
        value_schedule.forEach(s => {
            channel.send(`${s.rule.name}:${s.start} ${s.stage[0].name}, ${s.stage[1].name}`);
        });
    });
}
}