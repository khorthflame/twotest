var express = require('express');
var app = express();

app.listen(4000);

app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/',function(req,res){
  res.render('index');
});

app.get('/testa',function(req,res){
  res.render('a');
});

app.get('/ctrl',function(req,res){
  res.render('ctrl');
});

app.get('/sendhttp',function(req,res){
  res.send('这是/sendhttp请求的数据');
})
