var http = require('http');
http.createServer(function(req,res){
    if(req.url=='/favicon.ico'){
        return ;
    }
    res.write('llllll')
    console.log(req.url);
    res.end('well done');
}).listen(4000,'localhost');