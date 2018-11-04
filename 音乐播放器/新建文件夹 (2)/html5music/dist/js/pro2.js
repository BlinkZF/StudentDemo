
// 进度条模块
(function ($, root) {
    // 渲染总时间  左侧经过时间 右侧总时间
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPer = 0;
    var startTime;
    function renderAllTime(time) {
        lastPer = 0;
       curDuration = time;
        time = formatTime(time);
        $scope.find('.all-time').html(time);
    }
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        if(m < 10) {
             m = '0' + m;
        }
        if(s < 10) {
            s = '0' + s;
       }
        return m + ':' + s;
    }
    // 暴露方法

    function start(p){
       lastPer = p  === undefined ? lastPer : p;
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (curDuration *1000);
            upDate(per);
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }

    function stop(){
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration *1000);
    }

    function upDate(per){
        var time = per * curDuration;
        time = formatTime(time);
        $scope.find('.cur-time').html(time);
        var perX = (per - 1) *100 + '%';
        $scope.find('.pro-top').css({
            transform:'translateX(' + perX + ')'
        })
    } 

    root.pro = {
        renderAllTime:renderAllTime,
        start:start,
        upDate:upDate,
        stop: stop
    }

})(window.Zepto, (window.player || window.player == {}))