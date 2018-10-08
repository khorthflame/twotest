//处理数据层面的代码，负责数据的查询以及上传等操作
var fs = require('fs');
//查询uploads文件夹下的所有文件夹。并将其返回给调用者
exports.getDirs = function(){
    return ['a','b','c'];
}