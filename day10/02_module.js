require('./1.js');
//(引用1.js文件)
var a = require('./1.js');
//调用属性
console.log('module中调用1.js的属性'+a.a);
console.log('module中调用1.js的属性');
a.b();