//1,引入http
var http = require('http');
//2,创建服务
//引用fs模块
 var fs = require('fs');
var server = http.createServer(function(req,res){
 /*因为nodejs没有根目录，所有无法通过localhost:4000/02_root.html来访问该文件的内容
 可以使用fs模块来实现这个功能
    使用fs来读取02_root.html的内容，并将读取收到的数据作为响应内容返回给页面
 */
    fs.readFile('./02_root.html',function(err,data){
      if(err){  console.log(err);//打印错误信息 
        res.end('read file error!');
      }else{//读取文件成功
          console.log(data.toString());//看一下data
          res.end(data);//返回读取的数据
      }
    });
});
//3，开启服务监听端口
server.listen(5000,'localhost');