function webpage(){
    const express = require("express");
    const app = express();
    const homeURL = "/wb-discord-bot";

    /* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
    var server = app.listen(3000, function(){
        console.log(`start listening http://localhost:${server.address().port}/`);
    });
    app.set('view engine', 'ejs');

    app.get(`${homeURL}/`, (req, res)=>{
        res.json({body:"hello world"});
    });

    app.get(`${homeURL}/splatoon/setting`,(req,res)=>{
        res.render("splatoon-form",{})
    });
}
module.exports={webpage}