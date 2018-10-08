//使用querystring
var qs = require('querystring');
var url = 'a=1&b=3&name=zs';
//使用qs转换字符串为对象
var obj = qs.parse(url);
console.log(obj);