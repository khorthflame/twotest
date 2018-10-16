var express = require('express');
var db = require('./db.js'); 
var sd = require('silly-datetime');
var app = express();
app.listen(4000);
app.set('view engine','ejs');
app.get('/',function(req,res){
    db.find('message',function(err,docs){
       // console.log(err);
        console.log(docs);
        //var docs = docs;
        res.render('index',{msg:docs});
    })
})

app.get('/tijiao',function(req,res){
   console.log(req.query);
   var time = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
   req.query.time = time;
   console.log(time);
   db.add('message',req.query,function(err,result){
         console.log(err);
         console.log(result);
     })
    res.redirect('/');
   res.end();
})

