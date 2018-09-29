var fs = require('fs');
fs.readdir('./a',function(err,files){
    if(err){
        console.log(err);
        return ;
    }
       // console.log(files);
        //console.log(data[0]);
        // for(var i = 0;i<files.length;i++){
        //     //循环遍历打印data
        //     console.log(files[i]);
        //     fs.stat('./a/'+files[i],function(err,stats){
        //         if(stats.isFile()){
        //             console.log(files[i]+'是文件')
        //         }else{
        //             console.log(files[i]+'是文件夹')
        //         }
        //     })
        // }

        //递归
(function a(i){
    //先判定递归结束的条件
    if(i==files.length){//当i与数组长度一样，说明遍历结束
        return ;
    }
   fs.stat('./a/'+files[i],function(err,stats){
       if(err){
           console.log(err);
           return ;
       }
       if(stats.isFile()){
           console.log(files[i]+'是一个文件');
       }else{
           console.log(files[i]+'是一个文件夹');
       }
       a(++i);
   })
    })(0)
});







//递归
// (function a(i){
//     //先判定递归结束的条件
//     if(i==10){
//         console.log('递归结束')
//         return ;
//     }
//     console.log(++i);
//     //自增一后自调
//     a(i);
//     })(0)
//     //判断喜状态
