var express = require('express');
var cp = require('cookie-parser');
var app = express();
app.listen(4000);
//设置cookie解析方式
app.use(cp());
app.get('/',function(req,res){
    res.send('这是首页')
})
//设置cookie
app.get('/setCookie',function(req,res){
//   设置两个cookie username password
  res.cookie('username','Green');
  res.cookie('password','1234');
  res.send('设置cookie成功')  
})
//获取cookie
app.get('/getCookie',function(req,res){
    //   获取
    console.log(req.cookies);
    res.send('获取成功');
    })