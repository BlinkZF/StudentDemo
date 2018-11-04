<template>
  <div class="hot">
    <!--1.轮播图-->
    <div class="swiper-container" v-if="homecasual.length > 0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(casual, index) in homecasual" :key="index">
          <img :src="casual.imgurl" alt="" width="100%">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!--2.中间导航-->
    <hot-nav/>
    <!--3.广告位-->
    <div class="hot-ad">
      <img src="./../../imgs/hot_ad/home_ad.gif" alt="" width="100%">
    </div>
    <!--4.商品的列表-->
    <hot-shop-list/>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

  import HotNav from './HotNav'
  import HotShopList from './HotShopList'

  import {
    mapState
  } from 'vuex'

  export default {
    name: "Hot",
    components: {
      HotNav,
      HotShopList
    },
    computed: {
      ...mapState(['homecasual'])
    },
    mounted() {
      // 1. 请求轮播图的数据
      this.$store.dispatch('reqHomeCasual');
      // 2.请求首页导航的数据
      this.$store.dispatch('reqHomeNav');
      // 3. 请求首页的商品列表数据
      this.$store.dispatch('reqHomeShopList');
    },
    watch: {
      homecasual() {
        this.$nextTick(() => {
          // 创建swiper的实例
          new Swiper('.swiper-container', {
            autoplay: true,//等同于以下设置
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        });
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .hot
    width 100%
    height 100%
    padding-top 46px
    background #F5F5F5
    .hot-ad
      background-color #fff
      margin 8px 0
      padding 5px
</style>
