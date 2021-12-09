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

export default {
  name: 'App',
  components:{
    Header,
    Fooder
  }
}
</script>

<style>
</style>
