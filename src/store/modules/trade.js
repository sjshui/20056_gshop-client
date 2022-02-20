import {reqTradeInfo,reqTrade} from '@/api'

const state = {
    tradeInfo:{},
    trade:{}
}

const mutations = {
    RECEIVE_TRADE_INFO(state,tradeInfo){
        state.tradeInfo = tradeInfo
    },
    RECEIVE_USER(state,trade){
        state.trade = trade
    }
}

const actions = {
    async getTradeInfo({commit}){
        const result = await reqTradeInfo()
        if(result.code === 200){
            commit('RECEIVE_TRADE_INFO',result.data)
        }
    },
    async getTrade({ commit }) {
        // 发异步ajax请求(调用接口请求函数)
        const result = await reqTrade()
        // 如果请求成功了，得到数据提交给mutation
        if (result.code === 200) {
            const trade = result.data
            commit('RECEIVE_USER', trade)
        }
    }
}

const getters = {
    detailArrayList(state){
        return state.tradeInfo.detailArrayList || []
    },
    couponInfoList(state){
        return state.tradeInfo.couponInfoList || []
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}