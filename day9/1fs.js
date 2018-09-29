var start = new Date();
var start1 = new Date();
//console.log(1)
var fs = require('fs');
fs.readFile('./1.txt','utf-8',function(err,data){
    //console.log(2)
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});
//console.log(3)
//同步的读取文件
var result = fs.readFileSync('./1.txt');
var end = new Date();
var end1 = new Date();
console.log('同步执行一共花了'+(end - start));
console.log('异步执行一共花了'+(end1 - start1));