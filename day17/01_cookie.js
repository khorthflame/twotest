var express = require('express');
var app = express();
app.listen(4000);
//访问/请求 服务器生成cookie发送给浏览器 浏览器保存cookie
app.get('/',function(req,res){
    //设置cookie
    //cookie里面属性名为username 值为Jack Green
    res.cookie('username','Jack Green');
    //可以设置多个cookie 但是属性名不能一样
    res.cookie('age',23);
    res.cookie('sex','male');
   //如果属性名一样，后设置的会覆盖掉前面的
   res.cookie('username','zhangsan');
    res.send('访问/请求');


})