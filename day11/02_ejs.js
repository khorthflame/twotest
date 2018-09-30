//1,引用ejs模板
var ejs = require('ejs');
//2,创建一个模板
var str = '今天开始学习<%= msg %>';
//2，模拟一个填充的数据
//数据必须是一个k-v的json对象，其中key在模板中被调用
var data = {msg:'ejs'};
//将数据填充到模板中
//返回值为一个完整的视图
var html = ejs.render(str,data);
console.log(html);
