var express = require('express');
var session = require('express-session');
var app = express();
app.listen(4000);
app.set('view engine','ejs');
app.use(session({
    secret:'keyboard cat',//通过字符串获取一个hash值 用于生产一个sessionID
    resave:false,//是否强制自动保存 即使数据在请求期间没有被修改
    saveUninitialized:true,//强制保存未初始化的session
    cookie:{maxAge:99999999}//这是设置cookie的保存时间
}))

app.get('/',function(req,res){
    if(req.session.username){
        res.send('欢迎'+req.session.username+'<a href="/logout">退出登录</a>');   
    }else{
        res.render('lianxi');
    }
})

app.get('/login',function(req,res){
    if(req.query.username=='zs'&&req.query.password==123){
        req.session.username=req.query.username;
        res.send('欢迎'+req.query.username+'<a href="/logout">退出登录</a>')
    }else{
        res.send('用户名或密码错误')
    }
})

//处理/logout请求
app.get('/logout',function(req,res){
///删除session
req.session.destroy(function(err){
    if(err){
        res.send('退出失败');
    }else{
        res.send('退出成功');
        //res.redirect('/');
    }
})
})
