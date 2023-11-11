const fs = require("fs");
const path = require("path");

function createThread(client,channel_id,thread_name,autoArchiveDuration=60,reason="") {
    const channel = client.channels.cache.get(channel_id);
    channel.threads.create({
        name: thread_name,
        autoArchiveDuration: autoArchiveDuration,
        reason: reason,
    });
}

class JsonDBManager{
    dir = "../database"
    /**
     * @param {String} table_name 
     */
    constructor(table_name){
        this.table_name = table_name;
        this.filepath = path.resolve(__dirname,`${this.dir}/${table_name}.json`);
    }
    async write(f){
        let json_data = JSON.parse(await fs.readFileSync(this.filepath));
        json_data = f(json_data);
        fs.writeFileSync(this.filepath,JSON.stringify(json_data))
    }
    async read(){
        return JSON.parse(await fs.readFileSync(this.filepath));
    }
}

module.exports = {
    createThread,JsonDBManager
}