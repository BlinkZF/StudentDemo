<template>
  <div class="recommend-container">
    <!--<div class=" return">推荐</div>-->
    <ul class="recommend" v-if="userInfo.id && recommendshoplist.length > 0">
      <shop-list
        tag="li"
        v-for="(item, index) in recommendshoplist"
        :item=item
        :key="index"
        :clickCellBtn="dealWithCellBtnClick"
      />
    </ul>
    <select-login v-else/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import ShopList from './../../components/ShopList/ShopList';
  import BScroll from 'better-scroll';
  import {Indicator} from 'mint-ui';
  import {addGoodsToCart} from './../../api/index';
  import SelectLogin from './../Login/SelectLogin';

  export default {
    name: "Recommend",
    data() {
      return {
        page: 1,
        count: 10
      }
    },
    mounted() {
      Indicator.open('正在加载数据...');
      this.$store.dispatch('reqRecommendShopList', {
        page: this.page, count: this.count, callback: () => {
          Indicator.close();
        }
      });
    },
    computed: {
      ...mapState(['recommendshoplist', 'userInfo'])
    },
    components: {
      ShopList,
      SelectLogin
    },
    watch: {
      recommendshoplist() {
        this.$nextTick(() => {
          // 让当前的页码+1
          this.page += 1;
          // 初始化
          this._initBScroll();
        })
      }
    },
    methods: {
      _initBScroll() {
        // 1.1 初始化
        this.listScroll = new BScroll('.recommend-container', {
          scrollY: true,
          probeType: 3
        });

        // 1.2 监听列表的滚动
        this.listScroll.on('touchEnd', (pos) => {
          // 1.2.1 监听下拉
          /* console.log(pos.y);
           console.log(this.listScroll.maxScrollY);*/
          if (pos.y >= 50) {
            console.log('下拉刷新');
          }
          // 1.2.2 监听上拉
          if (this.listScroll.maxScrollY > pos.y + 20) {
            console.log(this.page);
            console.log('上拉加载更多');
            Indicator.open('正在加载数据...');
            this.$store.dispatch('reqRecommendShopList', {page: this.page, count: this.count, callback: ()=>{
                Indicator.close();
              }});
          }
        });

        // 1.3 列表滚动结束
        this.listScroll.on('scrollEnd', () => {
          this.listScroll.refresh();
        });
      },
      // 监听商品点击
      async dealWithCellBtnClick(goods){
         // 1. 发送请求
        // user_id, goods_id, goods_name, thumb_url, price
         let result = await addGoodsToCart(this.userInfo.id, goods.goods_id, goods.goods_name, goods.thumb_url, goods.price);
         console.log(result);
      }
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-container
    background #F5F5F5
    width 100%
    height 100%
    overflow hidden
    .recommend
      display flex
      flex-direction row
      flex-wrap wrap
      background #F5F5F5
      padding-bottom 50px
    .return
      width 100%
      height 50px
      background #fff
      text-align center
      line-height 50px
      margin-bottom 10px
      font-size 20px
</style>
