import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import MyPagination from './components/Pagination'

import './plugins/swiper'  // 加载swiper的配置
import './plugins/elemrnt' // 加载element-ui相关的配置
import './plugins/validate'
import './mock/mockServer'
import * as API from '@/api'

import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示 loading 图片
Vue.use(VueLazyload, { // 内部自定义了一个指令 lazy
loading,
// 指定未加载得到图片之前的 loading 图片
})


// 关闭生产提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(MyPagination.name,MyPagination)

// 1.创建或指定事件总线对象，保存到vue的原型上
// Vue.prototype.$bus = new Vue();

new Vue({
  beforeCreate(){
    // 1.创建或指定事件总线对象，保存到vue的原型上
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API // 当不使用vuex的时候，可以把接口请求函数全部装在对象当中挂载vue原型身上
  },  

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