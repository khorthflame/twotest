var table = document.getElementById("tab");//获取表格
var ul = table.getElementsByTagName("ul");//获取行
var li = ul[0].getElementsByTagName("li");//获取列
var c = [li.length, ul.length];//存储坐标x，y
var sn;//用于存储蛇身的数组

/*
cr    生成随机坐标x，y函数
coor  获取坐标对象方法函数
cn    新建节点函数
food  随机生成食物函数
*/
cr = function () { return r = [Math.floor(Math.random() * c[0]), Math.floor(Math.random() * c[1])]; }
coor = function (x, y) { return ul[y].childNodes[x]; }
cn = function (name) { sf = document.createElement("span"); sf.className = name; return sf; }
food = function () {
    cr();
    for (i = 0; i < sn.length / 2 - 1; i++) {
        if (r[0] == sn[2 * i] && r[1] == sn[2 * i + 1]) {
            cr();
        } else {
            break;
        }
    }
    coor(r[0], r[1]).appendChild(cn("food"));
}

function csnake() {
    //随机创建蛇身并存储蛇身坐标
    cr(); sn = [r[0], r[1]]; coor(sn[0], sn[1]).appendChild(cn("Snake"));

    //创建食物
    food();

    //方向键改变运动方向
    var direction = "up";
    document.onkeydown = function (e) {
        e = window.event || e;
        switch (e.keyCode) {
            case 37: direction = "left"; return false; break;//左
            case 38: direction = "up"; return false; break;//上
            case 39: direction = "right"; return false; break;//右
            case 40: direction = "down"; return false; break;//下
            default: break;
        }
    }

    //蛇规则运动函数
    snakeGo = function () {
        //判断运动方向并得到即将改变的坐标x，y
        var cx, cy;
        switch (direction) {
            case "left": cx = sn[sn.length - 2] - 1; cy = sn[sn.length - 1]; break;
            case "right": cx = sn[sn.length - 2] + 1; cy = sn[sn.length - 1]; break;
            case "up": cx = sn[sn.length - 2]; cy = sn[sn.length - 1] - 1; break;
            case "down": cx = sn[sn.length - 2]; cy = sn[sn.length - 1] + 1; break;
            default: break;
        }
        //删除蛇尾
        coor(sn[0], sn[1]).childNodes[0].remove();
        //判断是否碰到蛇身
        for (i = 0; i < sn.length / 2 - 1; i++) {
            if (cx == sn[2 * i] && cy == sn[2 * i + 1]) {
                GameOver("亲，你是不是头晕撞到自己了");
                return false;
            };
        }
        //向数组增加蛇头下一轨迹坐标
        sn.push(cx, cy);
        console.log(cy);
        //判断蛇头是否撞墙
        if (cx < 0 || cx > c[0]-1 || cy < 0 || cy > c[1]-1) {
            GameOver("宝贝，你撞墙自裁了");
            return false;
        }
        //判断是否吃到食物
        if (cx == r[0] && cy == r[1]) {
            coor(r[0], r[1]).childNodes[0].remove();//删除食物
            coor(sn[0], sn[1]).appendChild(cn("Snake"));
            coor(cx, cy).appendChild(cn("Snake"));
            food();
        } else {//删除蛇尾
            sn.splice(0, 2);
            coor(cx, cy).appendChild(cn("Snake"));
        }
    }

    var t = 500;//存储蛇跑的速度
    snakeItl = setInterval(function () {
        snakeGo();
    }, t)
    weGo = setInterval(function () { 
        t -= 20;
        if (t <= 5) { t = 5; }
        clearInterval(snakeItl);
        snakeItl = setInterval(function () {
            snakeGo();
        }, t);
        document.getElementById("shut").innerHTML = t;
    }, 5000);
    weGo;
}


function GameOver(text) {
    clearInterval(snakeItl);
    clearInterval(weGo);
    alert(text);
    //循环遍历删除所有蛇身
    for (u in ul) {
        if (!isNaN(u)) {
            var temp = ul[u].getElementsByTagName("li");
            for (l in temp) {
                if (!isNaN(l)) {
                    var span = ul[u].getElementsByTagName("li")[l].childNodes;
                    if (span != undefined && span.length) {
                        span[0].remove();
                    }
                }
            }
        }
    }


}