//get post
//封装get请求
function xhr_get(url,data){
    //创建xhr 
    var xhr = new XMLHttpRequest();
    if(data){
        url += "?"+data;
    }
    xhr.open('get',url);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&xhr.status==200){
            console.log(xhr.responseText);
        }
    }
}

//封装post请求
function xhr_post(url,data){
    var xhr = new XMLHttpRequest();
    xhr.open('post',url);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    if(data){
        xhr.send(data);
    }else{
        xhr.send();
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&xhr.status==200){
            console.log(xhr.responseText);
        }
    }
    }

    //将get和post请求封装到一起
     //参数
      //url：请求地址 data：请求参数 method:请求方式 get/post success:数据获取成功的回调函数
//    function success(data){
//        console.log(data)
//    }

function setData(data){
    //遍历data
    var urlData = '';
    for(var key in data){
      urlData += "&"+key+'='+data[key];
    }
    return urlData.slice(1);
}


      function xhr(obj){
          var xhr = new XMLHttpRequest();
        //判断methods
        if(obj.methods.toLowerCase()=='get'){
            if(obj.data){
                obj.url += "?"+setData(obj.data);
            }
            xhr.open(obj.methods,obj.url);
            xhr.send();
          
        }else if(obj.methods.toLowerCase()=='post'){
            xhr.open(obj.methods,obj.url);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            if(obj.data){
                xhr.send(setData(obj.data));
            }else{
                xhr.send();
            }   
        }
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&xhr.status==200){
                obj.success(xhr.responseText);
            }
        }
      }
 
     

// xhr({
//     url:xxx,
//     data:{
//         key:value
//     }
// })
