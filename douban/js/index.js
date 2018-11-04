//轮播图
    (function ($) {
        $.fn.extend({
            sliderImg: function (options) {
                options.father = this || $('body');
                new Swiper(options);
            }
        })
        function Swiper(opt) {
            var opts = opt || {};
            this.wrap = opts.father;
            this.img = opts.image;
            this.init();
        }   
        Swiper.prototype.init = function () {
            this.timer = undefined;
            this.moveWidth = parseInt(this.wrap.css('width'));
            this.len = this.img.length;
            this.lock = true;
            this.index = 0;
            this.createDom();
            this.startMove();
            this.bindEvent();
        }
        Swiper.prototype.createDom = function () {
            var len = this.len
            var sliderPage = $('<ul class="sliderPage"></ul>');
            var sliderIndex = $('<div class="sliderIndex"></div>');
            var leftBtn = $('<div class="btn leftBtn">&lt;</div>');
            var rightBtn = $('<div class="btn rightBtn">&gt;</div>');
            var str = '',
                listStr = '';
            for(var i = 0; i < len; i++) {
                str += '<li><img src="' + this.img[i] + '" alt=""></li>';
                listStr += '<span></span>'
            }
            str += '<li><img src="' + this.img[0] + '" alt=""></li>'
            sliderPage.html(str);
            sliderIndex.html(listStr);
            this.wrap.append(sliderPage)
                     .append(leftBtn)
                     .append(rightBtn)
                     .append(sliderIndex);
            $('.sliderPage').css({
                width: this.moveWidth * (len + 1) + 'px'
            })
            $('.sliderPage li').css({
                width: this.moveWidth + 'px'
            })
            $('.sliderIndex span').eq(0).addClass('active');
        }
        Swiper.prototype.startMove = function () {
            var self = this;
            setTimeout(function () {
                self.autoMove();
            }, 2000)
        }
        Swiper.prototype.autoMove = function (direction) {
            var self = this;
            if (self.lock) {
                self.lock = false;
                clearTimeout(self.timer);
                if (!direction || direction == 'left->right') {
                    self.index ++;
                    $('.sliderPage').animate({ left: $('.sliderPage').position().left - self.moveWidth }, 1000, function () {
                        if (Math.ceil($(this).position().left) == -self.len * self.moveWidth) {
                            self.index = 0;
                            $(this).css({ left: 0 });
                        }
                        self.timer = setTimeout(function () {
                            self.autoMove('left->right');
                        }, 2000);
                        self.lock = true;
                        self.changeIndex(self.index);
                    })
                } else if (direction == 'right->left') {
                    if ($('.sliderPage').position().left == 0) {
                        $('.sliderPage').css({ left: -self.len * self.moveWidth });
                        self.index = self.len;
                    }
                    self.index--;
                    $('.sliderPage').animate({ left: $('.sliderPage').position().left + self.moveWidth }, 1000, function () {   
                        self.timer = setTimeout(function () {
                            self.autoMove();
                        }, 2000);
                        self.lock = true;
                       self.changeIndex(self.index);
                    });
                }
            }
        }
        Swiper.prototype.bindEvent = function () {
            var self = this;
            $('.leftBtn').click(function () {
                self.autoMove('right->left');
            })
            $('.rightBtn').click(function () {
                self.autoMove('left->right');
            })
            $('span').each(function (myIndex) {
                (function (i) {
                    $('span').eq(i).on('click', function () {
                        self.lock = false;
                        clearTimeout(self.timer);
                        self.index = i;
                        $('.sliderPage').animate({ left: -i * self.moveWidth }, 300, function () {
                            self.timer = setTimeout(function () {
                                self.autoMove();
                            }, 2000);
                            self.lock = true;
                            self.changeIndex(self.index);
                        })
                    })
                }(myIndex))
            })
        }
        Swiper.prototype.changeIndex = function (_index) {
            $('.active').removeClass('active');
            $('span').eq(_index).addClass('active');
        }
    }(jQuery))