var express = require('express');
var app = express();
var db = require('./db/db.js');
var sd = require('silly-datetime');
var fd = require('formidable');
var fs = require('fs');
var gm = require('gm');
var bdParser = require('body-parser');
//获取ObjectID对象
var ObjectId = require('mongodb').ObjectId;
//使用session
var session = require('express-session');
//使用MD5加密
var md5 = require('./md5/md5.js');
app.listen(4000);
//设置模板引擎
app.set('view engine','ejs');
//设置根目录
app.use(express.static('./css'));
app.use(express.static('./photos'))
//设置请求解析方式
app.use(bdParser.urlencoded({extended:true}));
//配置session
app.use(session({
    secret:'message',//通过字符串获取一个hash值 用于生产一个sessionID
    resave:false,//是否强制自动保存 即使数据在请求期间没有被修改
    saveUninitialized:true,//强制保存未初始化的session
    cookie:{maxAge:24*60*60*1000}
}))
//定义常量
const message = 'message';//message集合
const user = 'user';//user集合
//判断用户是否登录,在其他请求处理之前判断
app.use(function(req,res,next){//处理所有以'/'开头的请求 next调用下面的中间件处理
  //判断用户是否登录 就是查看session中是否保存有用户信息
  if(req.session.username||req.url=='/login'||req.url=='/regist'){//登录和注册请求放行
      //查到了数据 说明已经登录了 不需要重新登录
      //可以直接进行后续的操作
      next();

  }else{
      //没查到数据 调到登录页面
      res.render('login');
  }
})

//访问/请求 访问首页
app.get('/',function(req,res){
    // res.render('index');
    //查询数据库 获取数据库的数据
    //获取登录的用户名 （在session里面）
    var username = req.session.username;
    db.findAll(message,function(err,docs){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'查询数据失败'});
        }else{
            //console.log(docs);
            //查询到结果将结果返回给index页面
           // res.render('index',{msg:docs,username:username});
           //根据username查询信息
        //    db.find(user,{username:username},function(err,users){
        //     if(err){
        //         console.log(err);
        //         res.render('error',{errMsg:'查询数据失败'});
        //     }else{
        //         res.render('index',{msg:docs,username:username,user:users[0]})
        //     }
        //    })
           //根据username获得登录用户量的信息
        //    上面的方式只能返回一个用户信息 还要额外查询所有用户的信息 简写成 直接查询所有用户的信息
         db.findAll(user,function(err,users){
            if(err){
                  console.log(err);
                  res.render('error',{errMsg:'查询数据失败'});
               }else{
                   //查到所有的user数据
                   //返回所有的user 所有的message以及登录的用户名
                  res.render('index',{msg:docs,users:users,username:username})
               }
         })
        }
    })
})

//处理get/tijiao请求 将数据保存进数据库 同时刷新页面
app.get('/tijiao',function(req,res){
    var query = req.query;
    //获取时间戳
    var time = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    query.time = time;
    //console.log(query);
    //判断name和message是否为空
    // if(query.username==undefined||query.username.trim()==''){
    //     res.render('error',{errMsg:'用户名不能为空'});
    //     return ;
    // }


    //username不再从页面获取 而是session
    var username = req.session.username;
    //将username加入到query中
    query.username = username;
    if(query.message==undefined||query.message.trim()==''){
        res.render('error',{errMsg:'留言不能为空'});
        return ;
    }
    db.add(message,query,function(err,result){
        if(err){
            //出错 打印错误信息 跳转到错误页面
            console.log(err);
            res.render('error',{errMsg:'留言失败'});
        }else{
            //留言成功 刷新首页
            res.redirect('/');
        }
    })
})

//处理get的删除请求 /delete的删除请求 删除某一条留言数据
app.get('/del',function(req,res){
//获取参数id
var id = req.query.id;//或者用time来查询
//必须是objectId类型 下面是字符拼接出来的字符串 不是ObjectId
//console.log(id);
//id = 'ObjectId("'+id+'")';

//将id转换为objectId类型
id = ObjectId(id)
//将id改写为json格式的数据作为删除的条件
var filter = {_id:id};
db.del(message,filter,function(err,result){
   //res.end()
   if(err){
       res.render('error',{errMsg:'删除数据失败'})
   }else{
       res.redirect('/');
   }
});
})

//处理get的修改请求/update 跳转到修改页面
app.get('/update/:id',function(req,res){
    //获取参数
    var id = req.params.id;
    //根据id去数据库查询到对应的一条数据
    id = ObjectId(id);//将字符串id转换为objectId类型
    db.find(message,{_id:id},function(err,docs){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'查询成功'})
        }else{
            //查询成功
            if(docs.length == 0){
                //没有查询到数据
                res.render('error',{errMsg:'没有此留言'});
                return;
            }
            //查到了数据 取第一个元素返回页面
            res.render('update',{msg:docs[0]});
        }
    })
})

//处理post的修改请求 /update 修改留言 刷新首页
app.post('/update',function(req,res){
    //绑定更新的时间
    var newtime = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    req.body.time = newtime;
  //获取参数
  var id = req.body.id;
  var msg = req.body.message;
  //判断message是否有值
  if(msg==undefined||msg.trim()==''){
      //也可以直接跳转到首页 不去数据库修改
      //res.render('/');
    res.render('error',{errMsg:'用户名不能为空'});
    return ;
}
  //将字符串id转换
  id = ObjectId(id);
  //修改的条件
  var filter = {_id:id}
  //修改的数据
  var data = {message:msg,time:newtime}
  
  db.modify(message,filter,data,function(err,result){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'修改数据失败'})
        }else{
            res.redirect('/');
        }
  })
})

//处理post的/login请求
app.post('/login',function(req,res){
    //获取请求参数
    var username = req.body.username;
    var password = req.body.password;

    //加密password

    password = md5.MD5(password)

    //设置查询用户信息的条件
    var filter = {username:username,password:password};
    //连接数据库开始查询
    db.find(user,filter,function(err,docs){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'登录失败'});
        }else{
            if(docs.length==0){
                //没有查到数据
                console.log(docs)
                res.render('error',{errMsg:'用户名或密码错误'});
            }else{
                //查到数据 登录成功
                //保存登录状态
                req.session.username = req.body.username;
                //跳转首页
                res.redirect('/');
            }
        }
    })
})

//处理get/regist 跳转到注册页面
app.get('/regist',function(req,res){
    res.render('regist');
})

//处理post/regist请求，注册用户名信息
 app.post('/regist',function(req,res){
     //获取参数
     var username = req.body.username;
     var password = req.body.password;
     if(username==undefined||username.trim()==''){
         res.render('error',{errMsg:'用户名不为空'})
         return ;
     }
     if(password==undefined||password.trim()==''){
        res.render('error',{errMsg:'密码不为空'})
        return ;
    }
    //加密
    password = md5.MD5(password);

    //判断用户名是否被占用
    db.find(user,{username:username},function(err,docs){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'网络出错'});
            return;
        }
        if(docs.length>0){
            res.render('error',{errMsg:'户名已经被占用'})
        }else{
            //设置新用户默认头像
            var photo = '/1.jpg';
            var data = {username:username,password:password,photo:photo};
            db.add(user,data,function(err,docs){
                if(err){
                    console.log(err);
                    res.render('error',{errMsg:'网络出错'});
                    return ;
                }
                // 保存成功
                // 1 直接跳转到登录页面 用户重新输入用户名密码登录
                // res.redirect('/');
                // 2 不需要重新输 注册成功后 系统自动登录
                req.session.username=username;
                res.redirect('/');
            })
        }
    })
    
 })

 //处理/logout请求 退出登录状态
 app.get('/logout',function(req,res){
   req.session.destroy(function(err){
       if(err){
           console.log(err);
           res.render('error',{errMsg:'退出失败'})
       }else{
           //退出成功
           res.redirect('/');
       }
   })
 })

 //处理get/toUpload请求 跳转到上传头像页面
 app.get('/toUpload',function(req,res){
     res.render('upload');
 })

 //处理post/doUpload请求 处理图片的上传
 app.post('/doUpload',function(req,res){
     //获得form对象
    var form = new fd.IncomingForm();
    //设置上传的路径
    form.uploadDir = './uploads';
    //解析请求 获取图片
    form.parse(req,function(err,fields,files){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'上传图片失败'});
            return ;
        }
        //处理files中的图片
        var pic = files.pic;
        //获取pic中需要的属性
        var oldPath = pic.path;//旧路径
        var name = pic.name;//图片名称
        var arr = name.split('.');
        var ext = arr[arr.length-1];//图片后缀名
        var username = req.session.username;//获取用户名
        var time = sd.format(new Date(),'YYYYMMDD');
        var newName = username+'_'+time+'.'+ext;
        console.log(newName);
        var newPath = './photos/'+newName;
        //改名字
        fs.rename(oldPath,newPath,function(err){
            if(err){
                console.log(err);
                res.render('error',{errMsg:'上传失败'});
                return ;
            }
            //res.redirect('/');
            //将新的头像路径 保存进数据库(不切图的情况 直接用原图做头像)
            //photo目录已经设置为根目录 里面的文件可以直接获取
            // db.modify(user,{username:username},{photo:newName},function(err,result){
            //     if(err){
            //         console.log(err);
            //         res.render('error',{errMsg:'网络错误'})
            //         return ;
            //     }
            //     res.redirect('/');
            // })

            //将上传的图片传递到剪切图片放入页面
            res.render('cut',{pic:newName});
        })
    })
 })

 //处理/cut请求 将图片剪切
 app.get('/cut',function(req,res){
     //获取参数
     var x = parseInt(req.query.x);
     var y = parseInt(req.query.y);
     var w = parseInt(req.query.w);
     var h = parseInt(req.query.h);
     //获取图片
     var pic = req.query.pic;
     //console.log(x,y,w,h,pic)
     //剪切图片
   // res.end();
   gm('./photos/'+pic).crop(w,h,x,y).write('./photos/'+pic,function(err){
       if(err){
           console.log(err);
           res.render('error',{errMsg:'剪切失败'})
           return ;
       }
       
    //    res.redirect('/');
    //将数据库的图片更新
    var username = req.session.username;
    db.modify(user,{username:username},{photo:pic},function(err,result){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'更新数据失败'})
            return ;
        }
        //更新成功 返回首页
        res.redirect('/');
    })
   });
 })