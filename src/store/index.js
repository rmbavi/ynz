import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
	addressInfo:{},
	isLogin:false
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
