var ejs = require('ejs');
var str = '这是一个数组：<%= stus[0].name %>';
var data = {names:['jack','rose','lily']};
var  stus = {stus:[{name:'zs'},{name:'ls'},{name:'ww'}]}
var html = ejs.render(str,stus);
console.log(html);