import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'

// 关闭生产提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  router, // 注册路由器 ==> 所有组件都可以直接访问两个对象$router与$route
}).$mount('#app')

/* -- eslint-disable no-unused-vars */
// const a = 123
