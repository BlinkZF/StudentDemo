(function ($) {
    var obj = {
        init: function (option) {
            this.options = option || {};
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            var self = this;
            var opt = self.options;
            var con = $('<div class="tab-con"></div>')
            var oSpan = $('<span class="header"></span>')
            var oUl = $('<ul class="top-tab"></ul>');
            var wrap = opt.father;
            var len = opt.tabList.length;
            var htmlStr = '';
            for (var i = 0; i < len; i++) {
                htmlStr += '<li title="tab'+ i +'">' + opt.tabList[i] + '</li>';
            }
            oUl.html(htmlStr);
            oUl.find('li:first').addClass('active2');
            if (opt.spanStr !== '') {
                wrap.append(oUl.prepend(oSpan.text(opt.spanStr)))
                    .append(con.html(opt.conStr));
            }else {
                wrap.append(oUl)
                    .append(con.html(opt.conStr));
            }
            for(var i = 0; i < len; i ++) {
                $($('.content')[i]).attr('id', 'tab' + i);
            }
            $($('.content')[0]).addClass('current');
        },
        bindEvent: function () {
            var self = this;
            $('.top-tab li').click(function () {
                var title = $(this).attr('title');
                $('.active2').removeClass('active2');
                $(this).addClass('active2');
                $('.current').removeClass('current');
                $('#' + title).addClass('current');
            })
        }
    }
    $.fn.extend({
        myTab: function (option) {
            option.father = this || $('body');
            obj.init(option);
        }
    })
}(jQuery))
// $.myTab({
//     spanStr: '',
//     tabList: ['本周流行音乐人', '上升最快音乐人'],
//     conStr: ['<div class="conBox">aa</div>','<div class="conBox">bb</div>']
// })