//实现渲染
(function ($, root) {
    var $scope = $(document.body);
    function renderInfo(info) {
        // 创建html内容
        var html ='<div class="song-name">'+info.song+'</div>'+
        '<div class="singer-name">'+info.singer+'</div>'+
        '<div class="album-name">'+info.album+'</div>'
        $scope.find(".song-info").html(html);
    }
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function(){
            root.blurImg(img,$scope);
            $scope.find(".song-img img").attr("src",src);
        }
    }
    function renderIslike(islike){
        if(islike){
            $scope.find(".like-btn").addClass("liking");
        }else{
            $scope.find(".like-btn").removeClass("liking");
        }
    }
    root.render = function (data) {
        renderInfo(data);
        renderImg(data.image);
        renderIslike(data.isLike);
    }

    // root.render= render;
})(window.Zepto, window.player || (window.player = {}));
//通过window.player暴露函数