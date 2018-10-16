var express = require('express');
var app = express();
app.listen(4000);
var session = require('express-session');
app.use(session({
    secret:'cat',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60000}
}))

//处理/search请求 每一次都讲用户搜索的结果显示在页面上
app.get('/search',function(req,res){
    //获取搜索的参数
    var name  = req.query.name;
    //获取session曾经保存的history
    var history = req.session.history||[];
    //判断输入的参数是不是undefined或者空字符串
    //如果是 不作操作 如果不是将其添加到历史数组中
    //先判断历史记录中是否已经保存了本次搜索的记录
    if(!(name==undefined||name.trim()=='')){
      history.push(name);
    }
    //将history保存到session
    req.session.history = history;
    //将历史显示在页面上
    res.send(history);
})