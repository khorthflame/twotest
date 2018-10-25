'use strict';//禁止this指向全局
//对象 封装一个ggl 一般情况下 初始化值：str:''  num:0  object:null||{}  Array:[]  Boolean:false/true
var ggl = {
    c1:null,//获取画布元素
    ctx:null,//获取画布对象
    c1_width:376,
    c1_height:82,
    ismousedown:false,//判断鼠标当前是否按下
    is_OK:false,//判断是否刮去一半面积以上
    num:1,//当前刮的次数
   init : function(){//初始化方法
     //初始化画布 
     this.c1 = document.getElementById('canvas1');
     this.ctx = this.c1.getContext('2d');
     this.c1.width = this.c1_width;
     this.c1.height = this.c1_height;
    //绘制画布 
        this.initCanvas();
    //调用mouse事件的封装
       eventMouse.addMouse.call(ggl,this.c1,this.mouseDown,this.mouseMove,this.mouseUp);//把后面的第一个参数
       this.initNum();
    },
   initCanvas:function(){
       //此方法绘制画布矩形
     this.ctx.globalCompositeOperation = 'source-over';
       //1，设置画布颜色 #797979
       this.ctx.fillStyle = '#797979';
       
       //2，绘制矩形
       this.ctx.fillRect(0,0,this.c1.width,this.c1.height);
       this.ctx.fill();
       //3,绘制文字 30px Bold #666 刮一刮  居中对齐
       this.ctx.font = 'bold 30px Microsoft yahei';
       this.ctx.fillStyle = '#ddd';
       this.ctx.textAlign = 'center';
       this.ctx.fillText('刮一刮',this.c1.width/2,this.c1.height/2+10);
    
       this.ctx.globalCompositeOperation = 'destination-out';
   },
   mouseDown:function(e){
    //ismousedown 设为true
    this.ismousedown=true;
  //把之前的内存中的事件清除
  e.preventDefault();
  
   },
   mouseMove:function(e){
       e.preventDefault();
       //判断鼠标是否按下
       if(!this.ismousedown){
           return ;
       }
       //绘制圆
       //计算id为top的盒子的偏移
       var left =document.getElementById('top').offsetLeft;
       var topY =document.getElementById('top').offsetTop;
       var x = e.points.dx-left,y=e.points.dy-topY;
       this.ctx.beginPath();
       this.ctx.arc(x,y,10,0,Math.PI*2);
       this.ctx.fill();
       this.ctx.closePath();
   },
   mouseUp:function(e){
       e.preventDefault();
       //得到canvas画布的整个像素数据 ctx.getImageData() 获取画布像素
       //像素:rgba 值 0~255  
       var a = this.ctx.getImageData(0,0,this.c1_width,this.c1_height);
       //遍历a.data  像素数据
       for(var i=0,j=0;i<a.data.length;i+=4){
           if(a.data[i]===0){
            j++;//记录像素为空的次数
           }
       }
       //判断当被刮开的区域大于一半时 则可以处理结果
       if(j>a.data.length/8){
           this.is_OK = true;
           //显示按钮
           $('.btn').css('z-index',10);
       }
    //    判断is_OK
      if(this.is_OK){
          //没刮完的自动去掉
          this.ctx.clearRect(0,0,this.c1_width,this.c1_height);
      }
      //把ismousedown再设置成false
      this.ismousedown = false;
       //console.log(a);
   },
   //控制刮卡的次数
   initNum:function(){
       //把btn的z-index设为1
       $('.btn').css('z-index',1);
       $('.btn').css('display','none');
       
       $('.num1').html(3-this.num);
       //获取随机数
       var randNum = function(a,b){
           return Math.floor(Math.random()*(b-a)+a);
       };
       var r = randNum(0,100);
       ///控制中奖概率
       if(3*this.num>r){
        $('#ok').css('display','block');
        $('#prompt').html('恭喜你 中奖了!');
       }else{
           //未中奖
           $('#no').css('display','block');
           $('#prompt').html('很遗憾 没中奖');
           var self = this;
           //解绑shij
           $('#no').unbind()
           $('#no').click(function(){
               console.log('aa')
            self.onceAgain();
           })
       }
       //初始化is_OK
       this.is_OK = false;
   },
   onceAgain:function(){
       if(this.num>=3){
           alert('你的次数已用完')
       }else{
           this.num++;
           //初始化按钮
           $('.btn').css('display','none');
           this.initCanvas();
           this.initNum();
       }
   }
   
}
//当页面加载时
window.onload = function(){
    ggl.init();
}
