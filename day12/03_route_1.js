var express = require('express');
var app = express();
var route = require('./03_route.js');
app.listen(4000);
//app.use('/',route.index);
//上面的写法还可以简写为下面方式
//app.use(route.index);
app.get('/',route.index);
app.get('/info',route.info);
app.get('/error',route.error);