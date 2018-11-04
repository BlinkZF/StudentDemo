bindEvent();
function bindEvent() {
    var timer;
    $('form .text').on('input', function () {
        var self = this;
        clearTimeout(timer);
        timer = setTimeout(function () {//防抖函数获取value值减少发送请求的次数
            var value = $(self).val();
            console.log(value);
            getData(value);
        },1000)
    })
}
function getData(value) {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: 'https://api.douban.com/v2/music/search?q='+ value +'&count=7',
        success: addSearchDom,
        error: function () {
            alert('error');
        }
    })
}
function addSearchDom(data) {
    var oUl = $('.global-input .search');
    var data = data.musics;
    console.log(data);
    var str = '';
    data.forEach(function (ele, index) {
        str += '<li><a href="'+ ele.alt +'">\
            <img src="'+ ele.image +'" alt="">\
            <div class="title"><em>'+ ele.title +'</em><p>'+ ele.author[0].name +'</p></div></a></li>'
    })
    oUl.html(str);
    if($('form .text').val() == '') {
        oUl.css('display','none');
    }else {
        oUl.css('display','block');
    }
}