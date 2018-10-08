//路由文件，处理各种请求的逻辑,如果涉及到数据，找专门处理数据的模块
var file = require('./file.js');//引入处理数据的模块
//展示首页
exports.showIndex = function(req,res){
    //res.render('index');
    //显示首页，将uploads中的所有文件显示在页面上
    //这就需要读取uploads中的内容
    var dirs = file.getDirs();//获取数据
    res.render('index',{dirs:dirs});
}

