import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  value: 0,
  currencies: []
}

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
