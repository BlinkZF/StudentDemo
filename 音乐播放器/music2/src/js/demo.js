var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var index = 0;
var songList;
var audio = new root.audioControl();

function bindEvent() {
    $scope.on("play:change", function (event, index) {
        audio.getAudio(songList[index].audio);
        if (audio.status == 'play') {
            audio.play();
            root.pro.start();
        }
        root.pro.renderAllTime(songList[index].duration);
        root.render(songList[index]);
    })
    $scope.on('click', ".prev-btn", function () {
        var index = controlManger.prev();
        audio.getAudio(songList[index].audio);
        if (audio.status == 'play') {
            audio.play();
            root.pro.start();
        }
        root.render(songList[index]);
    })
    $scope.on('click', ".next-btn", function () {
        var index = controlManger.next();
        audio.getAudio(songList[index].audio);
        if (audio.status == 'play') {
            audio.play();
            root.pro.start();
        }

        root.render(songList[index]);

    })
    $scope.on('click', '.play-btn', function () {
        if (audio.status == "play") {
            audio.pause();
            root.pro.stop();
        } else {
            audio.play();
            root.pro.start();
        }
        $(this).toggleClass("pause");//切换class值
    })
}
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            bindEvent();
            root.render(data[0]);
            controlManger = new root.controlManger(data.length);
            songList = data;
            $scope.trigger("play:change", index);
        },
        error: function () {
            console.log("error");
        }
    })
}
getData('../mock/data.json');