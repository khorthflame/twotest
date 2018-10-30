/* 面向对象的方式重构代码 */
var mySwiper = {
  banner: null,
  imageBox: null,
  baWith: null,
  pointBox: null,
  points: null,
  index: 1,
  startX: 0,
  moveX: 0,
  distanceX: 0,
  ISMOVE: false,
  timer: null,
  initSwiper: function () {
    this.banner = document.querySelector('.jd_banner');
    this.baWith = this.banner.offsetWidth;
    this.imageBox = this.banner.children[0];
    this.pointBox = this.banner.children[1];
    this.points = this.pointBox.querySelectorAll('li');
    // 调用 setTimer 启动定时器 
    this.setTimer();
    var self = this;
    // 添加页面可见事件 visibilitychange
    document.addEventListener('visibilitychange',function(e){
      if(document.hidden){
        clearInterval(self.timer);
        self.timer = null;
      }else{
        self.setTimer();
      }
    });
    // 绑定过渡结束事件，重新定位到第一张图片
    this.imageBox.addEventListener('webkitTransitionEnd', function () {
      // 处理过渡事件结束的逻辑 
      if (self.index >= 9) {
        self.index = 1;
        // 清除过渡
        self.clearTransition();
        // 调用 位移方法
        self.addTranslate(-self.baWith * self.index);
      } else if (self.index <= 0) {
        self.index = 8;
        self.clearTransition();
        self.addTranslate(-self.index * self.baWith);
      };
      // 调用 setPint() 
      self.setPoint();
    });
    // 绑定 touchstart 事件
    this.imageBox.addEventListener('touchstart', function (e) {
      e.preventDefault();
      // 停止轮播 关闭定时器 
      clearInterval(self.timer);
      self.timer = null; // 定时器设置为null 
      // 记录 startX 
      self.startX = e.touches[0].pageX;
    });
    // 绑定 touchmove 事件 
    this.imageBox.addEventListener('touchmove', function (e) {
      e.preventDefault();
      self.ISMOVE = true; // 表示滑动
      self.moveX = e.touches[0].pageX;
      // 记录滑动距离 
      self.distanceX = self.moveX - self.startX;
      // 重新定位 
      self.clearTransition(); // 清除过渡
      self.addTranslate(-self.index * self.baWith + self.distanceX);
    });
    // 绑定 touchend 事件
    this.imageBox.addEventListener('touchend', function (e) {
      e.preventDefault();
      if (!self.ISMOVE) { // 判断是否滑动过
        return;
      }
      // Math.abs() 取绝对值  
      if (Math.abs(self.distanceX) > self.baWith / 3) { //表示滑动有效
        // 判断右滑(上一张) 还是 左滑(下一张)
        if (self.distanceX > 0) { // 上一张
          self.index--;
        } else { // 下一张
          self.index++;
        };
        // 调用位移和过渡方法
        self.addTransition();
        self.addTranslate(-self.index * self.baWith);
      } else { // 滑动无效
        // 吸附回去 
        self.addTransition();
        self.addTranslate(-self.index * self.baWith);
      }
      // 重新初始化全局参数，防止对下一次滑动有影响
      self.startX = 0,
        self.moveX = 0, self.distanceX = 0, self.ISMOVE = false;
      // 再次开启定时器 
      self.setTimer();
    });
  },
  addTransition: function () {
    this.imageBox.style.transition = 'all .3s ease-out';
    // 兼容写法
    this.imageBox.style.webkitTransition = 'all .3s ease-out';
  },
  addTranslate: function (x) {
    this.imageBox.style.transform = 'translateX(' + x + 'px)';
    this.imageBox.style.webkitTransform = 'translateX(' + x + 'px)';
  },
  clearTransition: function () {
    this.imageBox.style.transition = 'none';
    this.imageBox.style.webkitTransition = 'none';
  },
  setTimer: function () {
    var self = this; // 留住 this
    this.timer = setInterval(function () {
      self.index++;
      // 调用 定位 过渡 
      self.addTransition();
      self.addTranslate(-self.baWith * self.index);
    }, 2000);
  },
  setPoint: function () {
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].className = '';
    };
    this.points[this.index - 1].className = 'now';
  }
};

window.onload = function(){
  mySwiper.initSwiper();
}