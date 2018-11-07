let animation = wx.createAnimation({
  duration: 4000,
  timingFunction: 'linear',
});
Page({
  data: {
    rotateData: {},
    turning: false,
  },
  start() {
    let _this = this;
    if (!this.data.turning) {
      let rdm = 0;
      let cat = 45;
      rdm = Math.floor(Math.random() * 3600);
      animation.rotate(rdm).step();
      this.setData({
        rotateData: animation.export(),
        turning: true,
      });
      setTimeout(() => {
        _this.setData({turning:false})
        let num = rdm % 360;
        function showModal(str) {
          wx.showModal({
            title: '提示',
            content: str,
            success:function(){
              let animation = wx.createAnimation({
                duration:1,
                timingFunction:'linear'
              })
              animation.rotate(0).step();
              _this.setData({
                rotateData:animation.export(),
              });
            }
          });
        }
        if (num <= cat * 1) { showModal('1-500随机红包'); }
        else if (num <= cat * 2) 
        { showModal('飞牛网代金券'); }
        else if (num <= cat * 3) 
        { showModal('2000减50'); }
        else if (num <= cat * 4) 
        { showModal('优酷观影劵'); }
        else if (num <= cat * 5) 
        { showModal('5000减100'); }
        else if (num <= cat * 6) 
        { showModal('爱鲜蜂红包'); }
        else if (num <= cat * 7) 
        { showModal('1000减20'); }
        else if (num <= cat * 8) 
        { showModal('iPhoneX max'); }
      }, 4000);
    }
  },
});
