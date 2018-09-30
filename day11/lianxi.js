var express = require('express');
var app = express();
app.listen(4000);
app.set('view engine','ejs');
app.get('/',function(req,res){
    res.send('这是首页');//用send不用get可以不加headerutf-8
})
var data={stus:['jack','rose','mike','jerry']}
app.get('/info',function(req,res){ 
    //将数据发送到视图
    res.render('lianxi',data);
});
