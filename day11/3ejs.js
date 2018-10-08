var ejs = require('ejs');
//创建模板
var str = '这是一个数组：<%= stus[0].name %>';
//模拟数据
var data = {names:['jack','rose','lily']};
var  stus = {stus:[{name:'zs'},{name:'ls'},{name:'ww'}]}
//填充
var html = ejs.render(str,stus);
console.log(html);