var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    if (req.url == '/favicon.ico') {
        return;
    }else if(req.url=='/circle'){
        fs.readFile('./yuan.html',function(err,data){
            if(err){
                console.log('错误');
            }else{
                res.end(data);
            }
        })
    }else if(req.url == '/square'){
        fs.readFile('./fang.html',function(err,data){
            if(err){
                console.log('错误');
                return;
            }
                res.end(data); 
        })
    }else{
        res.end('出错啦');
    }
});
server.listen(1000, 'localhost');