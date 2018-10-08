var express = require('express');
var app = express();
app.listen(4000);
// app.use(function(req,res,next){
//     console.log(req)
//     if(req.url=='/a'){//当请求路径为/a时不处理，让后面的路由处理
//         next();
//     }else{
//     res.send('get/请求');
//     }
// });



app.get('/a/123',function(req,res){
    res.send('get/a的学号为123');
})

//参数的传递与获取，与ng路由相似
//:后面的会当成参数的属性，获取时，通过req获取
//带有参数时 请求路径不固定 尽量将精确匹配的路径写在上面
//模糊匹配写在下面
app.get('/a/:id',function(req,res){
    var id = req.params.id;
    res.send('get/a请求'+id);
})
//正则匹配 /aaa/123 三个字母，三个数字的请求
app.get(/^\/aaa\/(\d{3})([a-z]{2})$/,function(req,res){
    console.log('这是参数'+req.params[1]);
    res.send('符合规范');
})