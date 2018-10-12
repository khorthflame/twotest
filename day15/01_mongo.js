//1，引入模块 获取mongo客户端对象
var mongoClient = require('mongodb').MongoClient;
//2，定义mongo服务器的地址
var url = 'mongodb://localhost:27017';
//数据库名称
var dbName = 'web1807';
//集合名称
var collection = 'student';
//开始连接服务器
mongoClient.connect(url,function(err,client){
    if(err){
        console.log(err);
        return ;
    }
    //没有出错连接成功
    //通过client获取数据库
    var db = client.db(dbName);
    //获取集合
    var coll = db.collection(collection);
    //var coll = client.db('web1807').collection('student);  
    //向集合中插入数据
    // db.collection('student').insert({})
    
    /*coll.insertOne({id:200,name:'徐宏',age:'23'},function(err,result){
        if(err){
            console.log(err);
            return ;
        }
        //插入成功
        console.log(result);
           
    //关闭连接
    client.close();
    })
  */
 

  //删除集合中某个数据
  //db.collection.remove({})
  coll.remove({id:103},function(err,result){
      if(err){
          console.log(err);
          return ;
      }
      //删除成功后
      console.log(result);
      client.close();
  })

})
