//服务器启动文件
var express = require('express');
var route = require('./scripts/route.js');//引用路由
var app = express();
app.listen(4000);
//设置视图模板引擎
app.set('view engine','ejs');
//设置根目录
app.use(express.static('./public'));
//处理/请求，显示首页内容
app.get('/',route.showIndex);


