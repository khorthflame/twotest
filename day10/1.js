console.log('这是1.js的内容');
require('./b.js');
var a = 2;
//console.log('1.js中属性a的值为'+a);
function b(){
    console.log('这是1.js的方法b');
}
// exports.暴露的名称 = 定义的额名称
//暴露的名称给外部文件使用
//调用的名称是内部自己定义的变量名或者方法名
exports.a = a;
exports.b = b;
