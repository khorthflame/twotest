//引入http模块
 var http = require('http');
 //通过http创建服务器
 var server = http.createServer(function(req,res){
 //编写服务器内容
 //end方法作用：结束请求，返回向应
 //如果要使用中文，需要先设置消息头
 res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
 res.end('我的第一个nodejs页面');
// console.log(1223)

 });
 //开启服务，监听端口
  server.listen(4000,'localhost');
 
