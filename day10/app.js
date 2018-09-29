var route = require('./route.js');
var http = require('http');
var server = http.createServer(function(req,res){
    if(req.url=='/favicon.ico'){
        return ;
    }
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    if(req.url == '/'){
        route.showIndex(req,res)
    }else if(req.url=='/info'){
        route.showInfo(req,res)
    }else{
        route.showError(req,res)
    }
})
server.listen(4000,'localhost');