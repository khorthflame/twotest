var crypto = require('crypto');
exports.MD5 = function(pwd){
    var str = crypto.createHash('md5').update(pwd).digest('base64');
    //将第一次得到的密文截取一部分
   str =  str.substr(5,10);
   //加密截取的密文
   var str = crypto.createHash('md5').update(str).digest('base64');
   return str;
}