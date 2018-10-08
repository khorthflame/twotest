//使用express框架创建服务器
var express = require('express');
var app = express();
app.listen(4000);
//设置视图模板引擎
app.set('view engine','ejs');//如果不设置 则写成res.render('01_template.ejs');

app.get('/a',function(req,res){
    //处理的请求路径忽略大小写
    //并且忽略参数
   // console.log(req);
    //res.send('服务器返回的数据');//不写end是为了避免中文乱码
    //模拟数据
    var data = {stus:[
        {id:1,name:'zs',sex:'m',age:'23'},
        {id:2,name:'ls',sex:'f',age:'43'},
        {id:3,name:'ww',sex:'m',age:'63'},
        {id:4,name:'zl',sex:'f',age:'26'}
    ]};
    res.render('01_template',data);
})