/* 
    axios二次封装
    1. 配置通用的基础路径和超时
    2. 显示请求进度条
    3. 成功返回的数据不再是response, 而直接是响应体数据response.data
    4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/

import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'


/* 1. 配置通用的基础路径和超时 */
// service是一个能发任意ajax请求的函数,当然可以作为对象使用
const service = axios.create({
    // baseUrl:'http://39.98.123.211', // 基础路径
    // baseURL: 'http://localhost:8082/',
    baseURL: '/api', // 基础路径
    timeout: 20000, // 超市事件
})


// 添加请求拦截器
service.interceptors.request.use((config) => {
    /* 2.显示请求进度条 */
    // 显示请求进度条：在请求拦截器中
    Nprogress.start()

    // 携带临时标识
    let userTempId = store.state.user.userTempId
    if(userTempId){
        config.headers.userTempId = userTempId
    }

    // 携带登入后标识token
    let token = store.state.user.token
    if(token){
        config.headers.token = token
    }

    // 必须返回config
    return config; // 后面就会根据返回的config，使用xhr对象发ajax请求
},() => {})


// 添加响应拦截器
service.interceptors.response.use(
    response => { // 请求成功返回的回调
        // 隐藏请求进度条：在响应拦截器成功的回调中
        Nprogress.done()

        // return response;

        /* 3. 成功返回的数据不再是response, 而直接是响应体数据response.data */
        return response.data
    },
    error => { // 请求失败返回的回调
        // 隐藏请求进度条：在响应拦截器成功的回调中
        Nprogress.done()

        /* 4. 统一处理请求错误, 具体请求也可以选择处理或不处理 */
        alert(error.message || '未知的请求错误')

        // return error  // 不能这么写
        // throw error
        return Promise.reject(error);
    }
)

/* service.get('/xxx').then(result => {
    // const result = response.data
}).catch(error => {
    // 做一些提示之外的特定工作
}) */

// 向外暴露service
export default service