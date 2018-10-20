//引入模块 获取数据库客户端对象
var mongoClient = require('mongodb').MongoClient;
//定义mongo服务器的地址
mongoClient.connect('mongodb://localhost:27017',function(err,client){
    if(err){
        console.log(err);
        return ;
    }
    //获取数据库和集合
   var coll =  client.db('web1807').collection('student');
//    coll.insertOne({id:'211',pwd:'123',age:'66',name:'徐红'},function(err,result){
//     if(err){
//         console.log(err);
//         return ;
//     }
//     console.log(result);
//     client.close();
//    })
      coll.insertMany([{name:'张三',id:'44'},{name:'李四',id:'45'}],{useNewUrlParser:true},function(err,result){
          if(err){
              console.log(err);
              return ;
          }
          console.log(result);
          client.close();
      })
})
