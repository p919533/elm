import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
    geohash     : null,
    cartList    : {} ,       //加入购物车的商品列表
    shopId      : null      //店铺id
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
