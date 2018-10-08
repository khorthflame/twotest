exports.index = function(req,res){
    res.send('这是首页')
}

exports.info = function(req,res){
    res.send('这是信息页')
}

exports.error = function(req,res){
    res.send('这是错误页')
}