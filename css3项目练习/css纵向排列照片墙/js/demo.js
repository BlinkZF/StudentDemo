var $wrap =  $('.wrapper');//取来wrapper这个元素
setTimeout(function () {
    $wrap.removeClass('init');
},200);
//当页面刷新后  延迟200    移除init属性
$('.item').on('click',function () {
    $(this).addClass('active');
    $wrap.addClass("wrapper-active");
});
$('.close').on('click',function (e) {
    e.stopPropagation();
    $('.active').removeClass('active');
    $wrap.removeClass("wrapper-active");
})