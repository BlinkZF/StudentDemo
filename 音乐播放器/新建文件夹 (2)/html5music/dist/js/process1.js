(function ($, root) {
    var $scope = $(document.body);
    var curDuration;
    var  frameId;
    var lastPer = 0;
    var startTime;
    // 渲染每首歌总时间
    function renderAllTime(duration) {
        lastPer = 0;        
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find('.all-time').html(allTime)
    }

    // 将秒转换成分+秒
    function formatTime(duration) {
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if (minute < 10) {
            minute = '0' + minute;
        }
        if (second < 10) {
            second = '0' + second;
        }
        return minute + ':' + second;
    }

    // 跟新当前已经播放时间与进度条
    function update(per) {
        var curTime = per * curDuration;
        curTime = formatTime(curTime);
        $scope.find('.cur-time').html(curTime);
         var perX = (per - 1)  * 100 + '%';
         $scope.find('.pro-top').css({
             transform:'translateX(' + perX + ')'
         }) 
    }

    // 刚开始播放时间
    function start(p) { 
        console.log('start')
        lastPer = p == undefined ? lastPer : p;
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime()
            var per = lastPer + (curTime - startTime) / (curDuration * 1000);
            if (per < 1) {
                frameId = requestAnimationFrame(frame);
                update(per);
            }else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }
    function stop(){
        // console.log('stop')
        cancelAnimationFrame(frameId);        
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
     }

    root.process = {
        renderAllTime: renderAllTime,
        update: update,
        start: start,
        stop:stop
    }

})(window.Zepto, window.player || (window.player = {}));