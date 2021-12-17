<template>
  <div id="app">
    <Header></Header>
    <!-- 所有的一级路由都在此显示 -->
    <router-view></router-view>
    <Fooder v-show="!$route.meta.isHideFooter"></Fooder>
    
  </div>
</template>

<script>
import Header from './components/Header'
import Fooder from './components/Fooder'
// import {getCategoryList} from './api'

export default {
  namespaced: true ,
  name: 'App',
  mounted(){
    // 异步获取三级分类列表
    // getCategoryList().then(result => {
    //   console.log('result',result)
    // })

    // 分发亲求获取分类列表的异步action
    this.$store.dispatch('home/getCategoryList')
    this.$store.dispatch('home/getBannerList')
  },
  components:{
    Header,
    Fooder
  }
}
</script>

<style>
</style>
