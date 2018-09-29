//获取当前时间
//  var now = new Date();
//  var year = now.getFullYear();
//  var month = now.getMonth();
//  var day = now.getDate();
//  console.log(year+'-'+month+'-'+day);
// 引用别人的模块格式化时间
//引用模块
var sd = require('silly-datetime');
var now = new Date();
//格式化当前时间
var str = sd.format(now,'YYYY-MM-DD HH:mm:ss');
console.log(str);