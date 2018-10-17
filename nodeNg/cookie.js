var express = require('express');
var app = express();
var cookie = require('cookie-parser');
app.listen(4000);
app.use(cookie());
app.use(function(req,res,next){
    var cookies = req.cookies;
    if(cookies.count){
        var count = ++cookies.count;
        res.cookie('count',count);
    }else{
        //第一次访问 没有count
        res.cookie('count',1)
    }
    next();
})
app.get('/',function(req,res){
    // res.cookie('name','jack');
    // var count = ++req.cookies.count;
    // res.cookie('count',count);
    var count = req.cookies.count||1;
    res.send('访问了:<h1>'+count+'</h1>次');
})
app.get('/get',function(req,res){
    // var count = ++req.cookies.count;
    // res.cookie('count',count);
    var count = req.cookies.count||1;
    res.send('访问了:<h1>'+count+'</h1>次');
})
app.use(function(req,res){
    //错误的地址不算次数
    var count = req.cookies.count||1;
    count--;
    res.cookie('count',count);
    res.send('访问了:<h1>'+count+'</h1>次');
})