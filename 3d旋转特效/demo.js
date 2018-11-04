init();
function init() {
    var oImg = $('img');
    var len = oImg.length;
    var deg = 360 / len;
    for (var i = 0; i <= len; i++) {
        $(oImg[i]).css({
            transform: 'rotateY(' + i * deg + 'deg) translateZ(350px)',
            transition: ' transform 1s ' + (len - 1 - i) * 0.15 + 's'
            //   通过先旋转后平移  动画延迟
        })
    }
    bindEvent();
}//拖拽
function bindEvent() {
    var oWrap = $('.box');
    var body = $('body');
    var lastX, lastY, nowX, nowY, disX = 0, disY = 0;
    var roX = -10, roY = 0;
    var timer;
    //鼠标落下时的xy  和抬起时的XY  计算出竖直水平的距离
    body.on('mousedown', function (e) {
        clearInterval(timer);
        var event = e || window.event;
        lastX = event.clientX;
        lastY = event.clientY;
        body.on('mousemove', function (e) {
            var event = e || window.event;
            nowX = event.clientX;
            nowY = event.clientY;
            disX = nowX - lastX;
            disY = nowY - lastY;
            //从左到右 x越来越大 disX>0
            roY += disX * 0.2;
            //从上往下  dis<0
            roX -= disY * 0.2;
            oWrap.css({
                transform: 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)','cursor': 'move'
                //rox决定旋转角度
            });
            lastX = nowX;
            lastY = nowY;//实时更新坐标
        });
        body.on('mouseup', function () {
            body.off('mousemove'); //解除事件
            clearInterval(timer);
            timer = setInterval(function () {
                disX *= 0.88;
                disY *= 0.58;
                roY += disX * 0.1;
                roX += disY * 0.1;
                oWrap.css({
                    transform: 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)', 'cursor': 'pointer'
                    //rox决定旋转角度
                })
                if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
                    clearInterval(timer);
                }
            }, 10);
        })
        return false;//取消鼠标点击的默认事件
    });
}

