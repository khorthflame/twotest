var express = require('express');
var app = express();
app.listen(4000);
var cp = require('cookie-parser');
var session = require('express-session');
app.use(session({
    secret:'cat',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:99999999}
}))
app.use(cp());
//这是cookie
// app.get('/set',function(req,res){
//     res.cookie('username','zs')
//     res.cookie('password','123')
//     res.send('设置cookie成功')
// })
// app.get('/get',function(req,res){
//     console.log('req.cookies:===',req.cookies);
//     res.send('获取cookies成功')
// })

//这是session
app.get('/get',function(req,res){
    var session = req.session; 
    req.session.name = req.query.name
    res.send(session.name);
})