var express = require('express');
var cookie = require('cookie-parser');
var app = express();
app.listen(4000);
app.use(cookie());
//统计用户访问该服务器的次数
app.use(function(req,res,next){
    if(req.url=='/favicon.ico'){
        return ;
    }
    //从cookie中获取count值
    var count = req.cookies.count;//上一次的次数
    if(count){//判断cookie里面是否包含count
       count++;
    }else{
        count=1;
    }
    // 保存
    res.cookie('count',count);
    res.write('you have visited this site'+' '+count+' '+'times\n');//\a是换行
    next();
})
app.get('/',function(req,res){
    res.end('index');
})
app.get('/a',function(req,res){
    res.end('aaaa');
})
app.get('/b',function(req,res){
    res.end('bbbb');
})
//处理所有的错误地址
app.use(function(req,res){
    //当访问地址错误时 将前面增加的一次扣掉
    var count = req.cookies.count;
    count--;
    res.cookie('count',count);
    res.end('error');   
})

///晚上再补充完整 未完成