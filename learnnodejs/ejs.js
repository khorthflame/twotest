var ejs = require('ejs');
var tem = '这是<%= msg %>';
var info = {msg:'填充的'};
var html = ejs.render(tem,info);
console.log(html);