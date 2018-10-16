var express = require('express');
var cp = require('cookie-parser');
var app = express();
app.set('view engine','ejs');
app.listen(4000);
app.use(cp());
app.get('/',function(req,res){
    var cookies = req.cookies;
    if(cookies.username){
        res.send('欢迎');   
    }else{
        res.render('lianxi');
    }
})

app.get('/login',function(req,res){
    var query = req.query;
    if(query.username == 'zhangsan'&&query.password=='123'){
        //先保存登录状态
        res.cookie('username',query.username,{maxAge:99999999});//100000毫秒后会自动删除
        res.send('登录成功欢迎'+query.username);
    }else{
        res.send('用户名或密码错误');
    }
})