var express = require('express');
var bdParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var app = express();
app.listen(4000);
app.set('view engine','ejs');
//设置post请求解析的方式application/x-www-form-urleencoded
app.use(bdParser.urlencoded({extended:true}));
app.get('/',function(req,res){
    res.render('lianxi2');
})
//处理post请求
app.post('/login',function(req,res){
    //获取请求参数
    var params = req.body;
    console.log(params);
    var username = params.username;
    var pwd = params.password;
    //将需要保存进数据库的数据组合成一个新的json对象
    var json = {name:username,pwd:pwd};
    //连接数据库，保存数据
    //数据库地址
    var url = 'mongodb://localhost:27017';
    mongoClient.connect(url,function(err,client){
        if(err){
            console.log(err);
            res.send('连接服务器失败');
            return ;
        }
        //连接成功
        var coll = client.db('web1807').collection('student');
        coll.find(json).toArray(function(err,docs){
            if(err){
                console.log(err);
            }else{
                //console.log('这是',docs);
                if(docs.length>0){
                    res.send('登录成功');    
                }else{
                    res.send('没有此用户');                 
                }
            }
            client.close();
         })
    })
})