import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'

import './plugins/swiper'  // 加载swiper的配置
import './mock/mockServer'

// 关闭生产提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  router, // 注册路由器 ==> 所有组件都可以直接访问两个对象: $router与$route
  store, // 注册vuex ==> 所有组件都可以直接访问1个对象：$store
}).$mount('#app')

/* -- eslint-disable no-unused-vars */
// const a = 123

/* 
  store对象的功能：
    读取数据:
      store.state.xxx
      store.getters.yyy
    更新数据:
      store.dispatch(action名称,data)
      store.commit(mutation名称,data)
*/