/* 
    管理首页相关数据的vuex子模块
*/
import { 
    reqCategoryList, 
    reqBannerList, 
    reqRecommends, 
    reqFloors,
    reqRank,
    reqLike
} from '@/api'

const state = {
    categoryList: [],
    bannerList: [],
    recommends: [],
    floors: [],
    rank:[],
    like:[]
}
const mutations = {

    /* 
        接受保存分类列表
    */
    RECEIVE_CATEGORY_LIST(state, categoryList) {
        state.categoryList = categoryList.splice(0, 16)
        // console.log(state,categoryList)
    },
    /* 
        接受保存广告轮播列表
    */
    RECEIVE_BANNER_LIST(state, bannerList) {
        state.bannerList = bannerList
    },
    /* 
        接受保存推荐列表
    */
    RECEIVE_RECOMMENDS(state, recommends) {
        state.recommends = recommends
        // console.log(state,categoryList)
    },
    /* 
        接受保存楼层列表
    */
    RECEIVE_FLOORS(state, floors) {
        state.floors = floors
    },
    /* 
        接受保存排列的列表
    */
    RECEIVE_RANK(state, rank) {
        state.rank = rank
    },
    /* 
        接受保存猜你喜欢的列表
    */
    RECEIVE_LIKE(state, like) {
        state.like = like
    }
}
const actions = {
    /* 
        获取三级分类列表的异步action
    */
    async getCategoryList({ commit }) {
        // 发异步ajax请求(调用接口请求函数)
        const result = await reqCategoryList()
        // 如果请求成功了，得到数据提交给mutation
        if (result.code === 200) {
            const categoryList = result.data
            commit('RECEIVE_CATEGORY_LIST', categoryList)
        }
    },
    /* 
        获取广告轮播列表的异步action
    */
    async getBannerList({ commit }) {
        // 发异步ajax请求(调用接口请求函数)
        const result = await reqBannerList()
        // 如果请求成功了，得到数据提交给mutation
        if (result.code === 200) {
            const bannerList = result.data
            commit('RECEIVE_BANNER_LIST', bannerList)
        }
    },
    /* 
        获取推荐列表的异步action
    */
    async getRecommends({ commit }) {
        // 发异步ajax请求(调用接口请求函数)
        const result = await reqRecommends()
        // 如果请求成功了，得到数据提交给mutation
        if (result.code === 200) {
            const recommends = result.data
            commit('RECEIVE_RECOMMENDS', recommends)
        }
    },
    /* 
        获取楼层列表的异步action
    */
    async getFloors({ commit }) {
        // 发异步ajax请求(调用接口请求函数)
        const result = await reqFloors()
        // 如果请求成功了，得到数据提交给mutation
        if (result.code === 200) {
            const floors = result.data
            commit('RECEIVE_FLOORS', floors)
        }
    },
    /* 
        获取排列的列表的异步action
    */
    async getRank({ commit }) {
        // 发异步ajax请求(调用接口请求函数)
        const result = await reqRank()
        // 如果请求成功了，得到数据提交给mutation
        if (result.code === 200) {
            const rank = result.data
            commit('RECEIVE_RANK', rank)
        }
    },
    /* 
        获取猜你喜欢的列表的异步action
    */
    async getLike({ commit }) {
        // 发异步ajax请求(调用接口请求函数)
        const result = await reqLike()
        // 如果请求成功了，得到数据提交给mutation
        if (result.code === 200) {
            const like = result.data
            commit('RECEIVE_LIKE', like)
        }
    },
}
const getters = {}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}