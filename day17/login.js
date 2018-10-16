var express = require('express');
var app = express();
app.listen(4000);
app.set('view engine','ejs');
app.get('/',function(req,res){
        res.render('login');
})

app.get('/login',function(req,res){
        
        var query = req.query;
        console.log(query);
        if(query.username == 'zhangsan'&&query.password=='123'){
            //先保存登录状态
            res.cookie('username',query.username,{maxAge:100000});//100000毫秒后会自动删除
            res.cookie('password',query.password);
            res.send('请求成功');
        }else{
            res.send('请求失败');
        }
        
})