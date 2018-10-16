//引入mongodb模块
var mongoClient = require('mongodb').MongoClient;
//数据库地址
const url = 'mongodb://localhost:27017';//常量
//数据库名称
const dbName = 'message';
//定义连接数据库的方法
/** 
 * @param {function} callback 回调,返回连接
*/
function GetConn(callback){
    mongoClient.connect(url,{useNewUrlParser:true},function(err,client){
        //返回连接结构
        callback(err,client);
    })
}
//定义并暴露查找所有数据的方法
/**
 * @param {string} collection 集合名称
 * @param {function} callback 回调函数，查询所有数据后，通过回调函数返回数据
 */
exports.findAll = function(collection,callback){
   GetConn(function(err,client){
    if(err){
        console.log(err);
        //连接失败将错误信息抛出给调用者
        throw new Error('连接数据库失败');
    }else{
        //连接成功开始获取数据库 获取集合 查询数据
        var coll = client.db(dbName).collection(collection);
        coll.find({}).toArray(function(err,docs){
            callback(err,docs);//返回结果
            client.close();//关闭连接
        })
    }
   });
}


//测试查找数据
// db.findAll('student',function (err,docs){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(docs);
//     }
// })


//增加数据
/**@param {string} collection 集合名称
/**@param {JSON} data 将要添加进数据库的数据
/**@param {function} callback 回调函数
 * 
 */
exports.add = function(collection,data,callback){
    GetConn(function(err,client){
        if(err){
            console.log(err);
            throw new Error('连接数据库失败');
        }else{
            var coll = client.db(dbName).collection(collection);
            //插入数据
            coll.insertOne(data,function(err,result){
                //console.log(result);
                callback(err,result.result);
                client.close();
            })
        }
    })
}

/** 
 * 修改数据
 * @param {string} collection 修改的集合名称
 * @param {JSON} filter 修改的条件
 * @param {JSON} data 修改的数据
 * @param {function} callback 回调
*/
exports.modify = function(collection,filter,data,callback){
    GetConn(function(err,client){
        if(err){
            console.log(err);
            throw new Error('连接失败')
        }else{
            var coll = client.db(dbName).collection(collection);
            //修改数据
            coll.updateMany(filter,{$set:data},function(err,result){
                callback(err,result.result);
                client.close();
            })
        }
    })
}


/**
 *
 *删除数据
 * @param {*} collection 集合名
 * @param {*} filter 删除条件
 * @param {*} callback 回调
 */
exports.del = function(collection,filter,callback){
    GetConn(function(err,client){
        if(err){
            console.log(err);
            throw new Error('连接数据库失败')
        }else{
            var coll = client.db(dbName).collection(collection);
            //删除符合条件的数据
            coll.deleteMany(filter,function(err,result){
                callback(err,result.result);
                client.close();
            })
        }
    })
}

/** 
 * @param {string} collection 集合名称
 * @param {JSON} filter 查询条件
 * @param {JSON} option 查询选项
 * @param {number} [option.start] 查询开始的页数
 * @param {number} [option.size] 每页显示的条数
 * @param {object} [option.order] 排序的依据
 * @param {function} callback 回调函数
*/

exports.find = function(collection,filter,option,callback){
    //判断参数的个数
    if(arguments.length == 2){
        //第一个表示集合 第二个表示回调 （2个参数一个是collection 一个是filter）
        //将回调函数重新赋值给callback,并将filter设置为默认值
        callback = filter;
        filter = {};
        //设置option的默认值
        //从第一页开始查看，每页显示5条信息 按时间降序排列
        option = {start:1,size:5,order:{time:-1}};
    }else if(arguments.length == 3){
        //第一个表示集合 第三个表示回调
        callback = option;
        option = {};//重置下面是赋值 如果filter参数存在则用filter参数 没有则用||后面的默认值
       option.start = filter.start||1;
       option.size = filter.size||5;
       option.order = filter.order||{time:-1};
       //判断重新赋值后的option与默认值option是否一致
       //一致 表示filter没有对应值 filter为查询条件 不一致 则取到了值 filter是查询参数 将查询条件设置为默认值{}
       if(JSON.stringify(option)!=JSON.stringify({start:1,size:5,order:{time:-1}})){//转为字符串再比较
        filter = {};
       }
       //或者判断filter中是否含有start,size,order中的一个或多个属性，若一个都没有，说明filter是查询条件 如下：
    //    if(filter.start!=undefined||filter.size!=undefined||filter.order!=undefined){
    //        filter={};
    //    }
    }else if(arguments.length==4){
        //四个参数 参数一一对应
        //其他参数使用传递进来的值 option需要判断一下
        option.start = option.start||1;
       option.size = option.size||5;
       option.order = option.order||{time:-1};
    }
    console.log(collection);
    console.log(filter);
    console.log(option);
    console.log(callback);
    //option中的start需要处理一下
    //数据库查询时，跳过的是具体的数据的条数
    //获取跳过的条数
    var skip = (option.start-1)*option.size;
    //获取每页显示的条数
    var size = option.size;
    //获取排序的依据
    var order = option.order;

//连接数据库
     //连接数据库
GetConn(function(err,client){
    if(err){
      console.log(err);
      throw new Error('连接数据库失败')
    }else{
      //查询
      var coll = client.db(dbName).collection(collection);
      coll.find(filter).skip(skip).limit(size).sort(order).toArray(function(err,docs){
        callback(err,docs);
        client.close();
      })
    }
  })
  
}