var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');
app.listen(4000);
app.get('/a',function(req,res){
    res.send('okok');
})
app.get('/html',function(req,res){
    fs.readFile('./view/express.ejs',function(err,data){
        if(err){
            return ;
        }
        console.log(data);
        res.send(data.toString());
    })
})
app.get('/mo',function(req,res){
    fs.readFile('./view/express.ejs',function(err,data){
        if(err){
            return ;
        }
        var info = {msg:[{name:'aa'}]};
        var html = ejs.render(data.toString(),info);
        res.send(html);
    })
})

//这种情况ejs里面的msg需要再下面定义一次，不然注释掉都会报错
app.get('/render',function(req,res){
    res.render('express.ejs');
})