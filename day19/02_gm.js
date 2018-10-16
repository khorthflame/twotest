var gm = require('gm');
gm('./1.png')
.flip()//翻转
.magnify()//放大
.rotate('green', 45)//旋转 填充色
 .blur(7, 3)//模糊效果
 .crop(300, 300, 150, 130)//剪切
 .edge(3)//描边
 .drawCircle(100,100,90,90)//圆心坐标x,y 偏离图片原点距离x,y
.write('./3.png', function (err) {
  if (!err) console.log('crazytown has arrived');
})