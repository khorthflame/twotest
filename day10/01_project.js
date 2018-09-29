var fs = require('fs');
var http = require('http');
var url = require('url');
var server = http.createServer(function(req,res){
    if(req.url=='/favicon.con'){
        return;
    }
    //使用url模块将字符格式的请求地址转换为对象，
    //并获取其中的pathname（请求路径）属性
    var pathname = url.parse(req.url).pathname;
//    读取index页面
//http://localhost:4000/css/index.css
//如果是/请求，将parsename重新赋值为/index.html
    if(pathname=='/'){
        pathname='/index.html';
    }
    //根据pathname来读取project文件夹下面的内容
    fs.readFile('./project'+pathname,function(err,data){
        //'./project/css/index.css'
        if(err){
            console.log(err);
        }else{
            //console.log(data);
            res.end(data);
        }
    });
    //发现问题：可以分别处理js 和 css 文件
});
server.listen(4000,'localhost');

