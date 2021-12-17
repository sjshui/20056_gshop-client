/* 
    管理搜索模块的数据
*/
import {reqSearch} from '@/api'

const state = {
    productList: {}, // 搜索的商品列表相关数据的对象
}

const mutations = {
    /* 
        接受保存商品列表相关数据对象
    */
   RECEIVE_PRODUCT_LIST (state,productList){
       state.productList = productList
   }
}

const actions = {
    /* 
        根据指定的搜索条件，异步获取商品列表的action
    */
   async getProductList({commit},searchParams){
    // 1. ajax请求，获取数据
    const result = await reqSearch(searchParams)
    // 2. 如果成功，提交给mutation
    if(result.code === 200){
        const productList = result.data
        commit('RECEIVE_PRODUCT_LIST',productList)
    }
   }
}

const getters = {
    // 商品分页列表
    goodsList (state) {
        return state.productList.goodsList || []
    },
    // 品牌列表
    trademarkList (state) {
        return state.productList.trademarkList || []
    },
    // 属性列表
    attrsList (state) {
        return state.productList.attrsList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}