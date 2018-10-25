'use strict'
// 创建对象
var eventMouse = {
    //添加方法 参数：elem 绑定事件的dom对象 绑定事件 addEventListener('事件名',处理函数,boolean)
    addMouse:function(elem,mDown,mMove,mUp){
        if(!elem || typeof elem !== 'object'){
            return ;
        }
        console.log(this);
        //留住this
        var self = this;
        //绑定mouseDown
        elem.addEventListener('mousedown',function(e){
            //内部调用 mDown 方法
           
            e.points = getPoint(e);
            mDown && mDown.call(self,e);
        });
        //绑定mousemove 和 mouseup
        elem.addEventListener('mousemove',function(e){
            //内部调用 mDown 方法
       
            e.points = getPoint(e);
            mMove && mMove.call(self,e);
        });
        elem.addEventListener('mouseup',function(e){
            //内部调用 mDown 方法
            e.points = getPoint(e); 
            mUp && mUp.call(self,e);  
        });
   
    //获取鼠标的x y 轴 坐标 参数e event对象 elem dom元素
      function getPoint(e){
        //event对象记录了坐标值 pageX pageY
        var x = e.pageX-elem.offsetLeft;
        var y=e.pageY-elem.offsetTop;
        return {
            dx:x,
            dy:y
        }
    }
}

}