/* 
    管理登入用户数据的vuex子模块
*/
import {
    reqUserRegister, 
    reqGetCode, 
    reqUserLogin,   
    reqUserInfo,
    reqUserLogout
} from '@/api'

import {getUserTempId,getToken,setToken,removeToken} from '../../utils/userabout'

/* 页面刷新或者项目重新启动，之前state当中所有的数据全部销毁重新初始化 */

const state = {
    // getUserTempId() 获取临时标识id
    userTempId:getUserTempId(),
    code:"",
    token:getToken(), // 先从localStorage当中获取token
    userInfo:{}
}

const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    RECEIVE_TOKEN(state,token){
        state.token = token
    },
    RECEIVE_USER_INFO(state,userInfo){
        state.userInfo = userInfo
    },
    RESET_USER_INFO(state){
        // 这个里面包含用户信息和token
        state.userInfo = {}
        state.token = ''
    }
}

const actions = {
    async userRegister({commit},userInfo){
        const result = await reqUserRegister(userInfo)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    async getCode({commit},phone){
        // 获取验证码的这个接口，把验证码返回，但是正常情况，后台把谈怎么发到用户手机上（省钱）
        const result = await reqGetCode(phone)
        if(result.code ===200){
            commit("GETCODE",result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    async userLogin({commit},userInfo){
        const result = await reqUserLogin(userInfo)
        if(result.code === 200){
            commit('RECEIVE_TOKEN',result.data.token)
            setToken(result.data.token)
            // 这里需要写返回值，之前我们存数据没有写return，是因为后续没有其它的不同操作
            // 这个需要写，是因为登入不但要存储token数据，而且要根据登入成功还是失败决定下一步往哪跳
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code === 200){
            commit('RECEIVE_USER_INFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    async resetUserInfo({commit}){
        removeToken() // 先调用函数清空localStorage当中的token信息
        commit('RESET_USER_INFO')
    },
    async userLogout({commit}){
        const result = await reqUserLogout()
        if(result.code === 200){
            removeToken() // 先调用函数清空localStorage当中的token信息
            commit('RESET_USER_INFO')
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }
}

const getters = {}



export default {
    state,
    mutations,
    actions,
    getters
}