
//引入加密模块
// var crypto = require('crypto');
// //定义一个秘密123
// var pwd = '123';
// pwd+='abc'//加盐
// //加密 加密二次
// var str = crypto.createHash('md5').update(pwd).digest('base64');
// var str = crypto.createHash('md5').update(pwd).digest('base64');
// console.log(str)

//加密普通的字符串
var md5 = require('./md5/md5.js');
/*
var pwd = '123';
var str = md5.MD5(pwd);
console.log(str)
*/

//提取文件的校验码（1.txt)
var fs = require('fs');
//提取1.txt的校验码
fs.readFile('./1.txt',function(err,data){
    if(err){
        console.log(err);
    }else{
        var str = data.toString();
        var digest = md5.MD5(str);
        console.log(digest);
    }
})
