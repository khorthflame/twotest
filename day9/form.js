var http = require('http');
var fs = require('fs');
var url = require('url');
var server = http.createServer(function (req, res) {
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    //调用url模块的parse方法，转换reg.url字符串
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;//获取请求路径
   
    var query = urlObj.query;//获取请求参数对象
    console.log(pathname,'aaaaaaa');
    console.log(urlObj,'bbbb');
    console.log(query,'cccc');
    if (pathname == '/favicon.ico') {
        return;
    }else if(pathname=='/'){
        console.log(req.url);
        fs.readFile('./form.html',function(err,data){
            console.log(6)
            if(err){
                //console.log(err);//打印错误信息
                res.end('出错啦');//返回响应
                return;
            }
              res.end(data);//正确结果返回数据
        })
    }else if(pathname=='/tijiao'){//处理提交的请求
        //console.log(req.url);
        var username = query.username;
        var password = query.password;
        res.end('用户名'+username+'密码'+password)
     }else{
        res.end('请求地址出错');

     }
        //res.end('成功接收请求数据')
        // fs.readFile('./form.php',function(err,data){
        //     if(err){
        //         res.end('出错啦');
        //         return;
        //     }else{
        //         res.end(data);
        //     }
        // })
    //}
});
server.listen(4000, 'localhost');