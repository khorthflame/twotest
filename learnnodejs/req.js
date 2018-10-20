var request = require('request');
request('https://www.baidu.com/',function(err,res,body){
    if(err){
        console.log(err);
        return ;
    }
    console.log(res);
    console.log(body)
})