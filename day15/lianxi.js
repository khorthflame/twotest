var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var dbname = 'web1807';
var collection = 'student';
mongoClient.connect(url,function(err,client){
    if(err){
        console.log(err);
        return;
    }
    var db = client.db(dbname);
    var coll = db.collection(collection);
    //增
    /*coll.insertOne({id:201,name:'徐红'},function(err,result){
        if(err){
            console.log(err);
            return ;
        }
        //console.log(result);
        client.close();
    })*/

    //改
     /*coll.updateOne({id:201},{$set:{age:100}},function(err,result){
         if(err){
             console.log(err);
             return ;
         }
         console.log(result);
         client.close();
     })*/

     //查
    /* coll.find({id:201}).toArray(function(err,docs){
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
        client.close();
     })*/

    //删
     coll.remove({id:104},function(err,result){
        if(err){
            console.log(err);
            return ;
        }
        //删除成功后
        console.log(result);
        client.close();
    })
  

})