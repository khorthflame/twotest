var fs = require('fs');
var xx = [];
var yy =[];
fs.readdir('./a',function(err,files){
    if(err){
        console.log(err);
        return ;
    }
    (function a(i){
        //先判定递归结束的条件
        if(i==files.length){//当i与数组长度一样，说明遍历结束
            console.log('文件有：');
            for(key in xx){
                console.log(xx[key])
            }
            console.log('文件夹有：');
            for(key in yy){
                console.log(yy[key])
            }
            return ;
        }
        
       fs.stat('./a/'+files[i],function(err,stats){
       
           if(err){
               console.log(err);
               return ;
           }
          
           if(stats.isFile()){
               xx.push(files[i]);
              // console.log(xx)
           }else{
         yy.push(files[i]);
              // console.log(yy)
           }
           //console.log(xx)
           a(++i);
        })
       
        
        })(0)
      
       // console.log(yy,'aaa');
         //console.log(files);
        //console.log(data[0]);
        // var xx = [];
        // for(k in files){
        //     //循环遍历打印data
        //     //console.log(files[k]);
        //     fs.stat('./a/'+files[k],function(err,stats){
        //         if(stats.isFile()){
        //             console.log(files[k]+'是文件');
        //             xx.push(files[k]);
        //         }else{
        //             console.log(files[k]+'是文件夹')
        //         }
        //         console.log(xx)
        //     })
        // }
        // console.log(xx);
})