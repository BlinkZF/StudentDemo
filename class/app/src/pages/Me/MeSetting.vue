<template>

  <div class="me-setting">
    <div class=" return">
      <img src="./images/left.png" alt="" v-on:click="func">
    </div>
    <div>
      <me-common-cell left-icon="itlike-2" left-title="免密码支付设置"/>
      <me-common-cell left-icon="itlike-3" left-title="免拼单设置" :clickCell="dealCellClick"/>
      <me-common-cell left-icon="itlike-1" left-title="消息接收设置" right-title="接收" right-title-color="red"/>
    </div>
    <div style="margin-top: 10px;">
      <me-common-cell left-icon="itlike-5" left-title="常见问题" :clickCell="dealCellClick"/>
      <me-common-cell left-icon="itlike-4" left-title="意见反馈" :clickCell="dealCellClick"/>
    </div>
    <div style="margin-top: 10px;">
      <me-common-cell left-icon="itlike-5" left-title="商家免费入驻" :clickCell="dealCellClick"/>
    </div>
    <div style="margin-top: 10px;">
      <me-common-cell left-icon="itlike-5" left-title="给我们好评吧" :clickCell="dealCellClick"/>
      <me-common-cell left-icon="itlike-4" left-title="检查更新" :clickCell="dealCellClick"/>
    </div>

    <div style="margin-top: 10px;">
      <me-common-cell left-icon="itlike-1" left-title="清除缓存" :clickCell="dealCellClick"/>
    </div>

    <div class="logout" @click="dealLogout">退出登录</div>
  </div>
</template>

<script>
  import MeCommonCell from './MeCommonCell';
  import {Toast, MessageBox} from 'mint-ui';
  import {mapActions} from 'vuex'

  export default {
    name: "MeSetting",
    components: {
      MeCommonCell
    },
    methods: {
      ...mapActions(["logOut"]),
      dealCellClick(props) {
        Toast('点击了' + props);
      },
      func (){
        this.$router.push({path: '/me'});
      },
      dealLogout() {
        // console.error(11);
        MessageBox.confirm('您确定退出登录吗?').then(action => {
           // console.log(action);
           if('confirm' === action){
                // 退出登录
                let result = this.logOut({});
                // console.log(result);
                // 回到主界面
                this.$router.replace('/home');
           }
        });
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .return
    width 100%
    height 50px
    background #fff
    margin-bottom 10px
    img
      width 40px
      height 40px
      position absolute
      top 1%
      opacity 0.2


  .logout
    width 100%
    height 44px
    margin-top 10px
    background-color #fff
    display flex
    justify-content center
    align-items center
    text-align center
</style>
