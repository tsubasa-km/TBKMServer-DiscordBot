const request = require("request");
const bodyParser = require('body-parser')

const {JsonDBManager} = require("./source/util");

function webpage(){
    const express = require("express");
    const app = express();
    const homeURL = "/wb-discord-bot";

    /* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
    var server = app.listen(3000, function(){
        console.log(`start listening http://localhost:${server.address().port}${homeURL}`);
    });
    app.set('view engine', 'ejs');
    app.use("/public", express.static(__dirname + "/public"));
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get(`${homeURL}/`, (req, res)=>{
        res.json({body:"hello world"});
    });

    app.get(`${homeURL}/splatoon/stage-select/`,async(req,res)=>{
        res.render("splatoon",{})
    })
    app.get(`${homeURL}/splatoon/stage-select/:mode`,async(req,res)=>{
        if(!["favorite","unfavorite"].includes(req.params.mode)){
            res.status(404).json({body:"notfound"});
            return;
        }
        var options = {
            url: 'https://api.koukun.jp/splatoon/3/stage/?image=true',
            method: 'GET'
        }
        var splaDataManager = new JsonDBManager("spla-data");
        var splaData = await splaDataManager.read();
        request(options,(error,response,body)=>{
            data = JSON.parse(body);
            res.render("splatoon-form",{
                data,
                splaData,
                splaDataManager,
                params:req.params
            });
        });
    });
    app.post(`${homeURL}/splatoon/stage-select`,(req,res)=>{
        var splaDataManager = new JsonDBManager("spla-data");
        splaDataManager.write(()=>JSON.parse(req.body["send-data"]))
        res.status(200).redirect(`${homeURL}/splatoon/stage-select/`);
    })
}
module.exports={webpage}