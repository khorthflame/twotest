var request = require('request');
request('https://www.baidu.com',function(err,res,body){
    console.log(err);
    console.log('=======');
    console.log(res);
    console.log('=============');
    console.log(body);
})