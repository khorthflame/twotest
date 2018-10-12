var express = require('express');
var bdParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var app = express();
app.listen(4000);
app.set('view engine','ejs');
//设置post请求解析的方式application/x-www-form-urleencoded
app.use(bdParser.urlencoded({extended:true}));
app.get('/',function(req,res){
    var url = 'mongodb://localhost:27017';
    mongoClient.connect(url,function(err,client){
        if(err){
            console.log(err);
            res.send('服务器出错');
            return ;
        }
        //连接成功
        var coll = client.db('web1807').collection('student');
        coll.find({}).toArray(function(err,docs){
            if(err){
                console.log(err);
            }else{
                //返回视图页面
                var data={stus:docs}
               res.render('lianxi3',data);
            }
            client.close();
         })
    })
})
