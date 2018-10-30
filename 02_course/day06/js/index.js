/**1,移动端轮播 自动轮播(定时器+C3-位移+过渡,无缝衔接-过渡结束事件加上定位)
 * 2，点要跟随轮播改变样式 
 * 3，可以滑动轮播图(touch事件)
*/
  window.onload = function(){
      //mySwiper();
      search();
  }
//自动轮播
function mySwiper(){
    //获取轮播的盒子
    var banner = document.querySelector('.jd_banner');
    //图片宽度
    var baWidth = banner.offsetWidth;
    //图片的盒子
    var imageBox = banner.children[0];
    //点的集合
    var pointBox = banner.children[1]; 
    //获取所有的点集合
    var points = pointBox.querySelectorAll('li');
    //定义过渡方法
    var addTransition = function(){
        imageBox.style.transition = 'all .5s ease-out';
        //兼容写法
        imageBox.style.webkitTransition = 'all .5s ease-out';
    }
    //定义位移方法
    var addTranslate = function(x){
        imageBox.style.transform = 'translateX('+x+'px)';
        imageBox.style.webkitTransform = 'translateX('+x+'px)';
      
    }
    //定义清除过渡方法、
    var clearTransition = function(){
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };
    var index = 1;
    //定义定时器实现自动轮播
     var timer = setInterval(function(){
        index++;
         //调用 定位 过渡
         addTransition();
         addTranslate(-baWidth*index);
         console.log(index)
     },2000);
   imageBox.addEventListener('webkitTransitionEnd',function(){
       //处理过渡事件结束事件
       if(index>=9){
            index=1;
            clearTransition();
            addTranslate(-baWidth*index);
       }else if(index<=0){
           index = 8;
           clearTransition();
           addTranslate(-baWidth*index);
       }
       //调用要跟随滚动 改变当前li的样式
       setPoint();
   })
   // 点击跟随滚动 改变当前li的样式
  function setPoint(){
         for(key in points){
             points[key].className = '';
         }
         points[index-1].className = 'now'
   };
   //绑定touch事件 滑动图片功能
   //需要初始化的变量
    // startX moveX  distanceX ISMOVE 
    var startX = 0,//开始触摸的x轴坐标
        moveX = 0,//记录滑动的x轴距离
        distanceX = 0,//记录滑动的距离 moveX-startX
        ISMOVE = false; //表示是否滑动
        // 绑定事件
        imageBox.addEventListener('touchstart',function(e){
            e.preventDefault();
            //停止轮播 关闭计时器
            clearInterval(timer);
            timer = null;
            //记录startX
            startX = e.touches[0].pageX;
            console.log(startX)
        })
        //绑定touchmove事件
        imageBox.addEventListener('touchmove',function(e){
            e.preventDefault();
            ISMOVE = true;//表示滑动
            moveX  = e.touches[0].pageX;
            //记录滑动距离
            distanceX = moveX-startX;
             //重新定位
            console.log(moveX,'==',distanceX);
            clearTransition();//清除过渡
            addTranslate(-index*baWidth+distanceX);
        })
        //绑定touchend事件
        //当滑动的距离不超过图片的三分之一 当前滑动无效
        //滑动超过三分之一时 当前滑动生效 切换下一张或上一张
        imageBox.addEventListener('touchend',function(e){
            e.preventDefault();
            if(!ISMOVE){//判断是否划过
                return ;
            }
            //Math.abs()  取绝对值
            if(Math.abs(distanceX) > baWidth/3){//表示滑动有效
                //判断右滑(上一张)还是左滑(下一张)
                if(distanceX > 0){//上一张
                    index--;
                }else{
                    index++;
                }
                addTransition();
                addTranslate(-baWidth*index);
                
            }else{
                //滑动无效
                //吸附回去
                addTransition();
                addTranslate(-index*baWidth)
            }
            ///重新初始化全局参数 防止对下一次滑动有影响
            startX = 0;
            moveX = 0;
            distanceX = 0;
            ISMOVE = false;
            //再次开启定时器
           timer = setInterval(function(){
                index++;
                addTransition();
                addTranslate(-index*baWidth);
            },2000)

        })
}

//搜索区域滚动效果‘
 function search(){
   //颜色随着页面滚动 逐渐加深(变得不透明)
   //当滚动的距离超过轮播图 的高度是 颜色保持不变
   //浏览器滚动事件
   //window.onscroll
   //监听滚动高度 document.body.scrollTop
   //获取搜索盒子
   var searchBox = document.querySelector('.jd_header_box');
   //获取轮播图的高度
   var bannerh = document.querySelector('.jd_banner').offsetHeight;
   //监听scroll滚动事件
   window.onscroll = function(){
       //获取页面滚动的高度
       var top = document.documentElement.scrollTop;
      var opacity = 0;
       if(top < bannerh){
           //设置透明度
            opacity=top / bannerh;
       }else{
           opacity = 1;
       }
       searchBox.style.background = 'rgba(201,21,35,'+opacity+')';
   }
 }

 function time(){
     var today = new Date().getTime();
     var eleven = new Date('2018/11/11').getTime();
     var offset = eleven - today;
     console.log(offset);
     var day = 	Math.floor(offset/1000/60/60/24);
	 var hour = Math.floor(offset/1000/60/60-day*24);
	 var min = Math.floor(offset/1000/60-day*24*60-hour*60);
     var sec = Math.floor(offset/1000-day*24*60*60-hour*60*60-min*60); 
     var divObj = document.querySelector('.sk_time');
     var time0 = divObj.children[0];
     var time1 = divObj.children[1];
     var time3 = divObj.children[3];
     var time4 = divObj.children[4];
     var time6 = divObj.children[6];
     var time7 = divObj.children[7];
     time0.innerHTML = Math.floor(hour/10);
     time1.innerHTML = hour%10;
     time3.innerHTML = Math.floor(min/10);
     time4.innerHTML = min%10;
     time6.innerHTML = Math.floor(sec/10);
     time7.innerHTML = sec%10;
 }
 time();
 setInterval(time,1000)