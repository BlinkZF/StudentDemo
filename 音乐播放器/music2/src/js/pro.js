(function ($, root) {
    //进度条模块   渲染左右时间  更新进度条
    //渲染总时间
    var durition;
    var frameId;
    var lastPer = 0;
    var startTime;
    function renderAllTime(time) {

        durition = time;
        time = formatTime(time);
        $('.all-time').html(time);
    }
    //处理时间格式  秒--分+':'+秒
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        if (m < 10) {
            m = '0' + m;
        };
        if (s < 10) {
            m = '0' + s;
        }
        return m + ":" + s;
    }
    //渲染左侧时间
    function start(p) {
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (durition * 1000);
            update(per);
            frameId = requestAnimationFrame(frame);//根据目前屏幕的刷新频率请求时间
        }
        frame();
    }
    //更新Html
    function update(p) {
        var time = p * durition;
        time = formatTime(time);
        $('.cur-time').html(time);
        var perX = (p - 1) * 100 + '%';
        $('.pro-top').css({
            transform: 'translateX(' + perX + ')'
        })
    }
    //停止更新
    function stop() {
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (durition * 1000);
        cancelAnimationFrame(frameId);
    }

    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop
    }


})(window.Zepto, window.player || (window.player == {}));
