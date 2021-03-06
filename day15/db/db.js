//引入mongodb模块
var mongoClient = require('mongodb').MongoClient;
//引入配置文件
var config = require('./config.js')
//数据库地址
const url = config.url;//常量
//数据库名称
const dbName = config.dbName;
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
// db.findAll('student',function aa(err,docs){
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