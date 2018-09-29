var http = require('http');
var server = http.createServer(function(req,res){
    if(req.url=='/favicon.con'){
        return;
    }
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    res.write('第一次返回');
    res.write('<h1>第二次返回h1标签</h1>');
    res.write('<div style="border:1px solid red">第三次返回</div>');
    //结束请求，结束数据
    res.end('返回数据');
});
server.listen(4000,'localhost');