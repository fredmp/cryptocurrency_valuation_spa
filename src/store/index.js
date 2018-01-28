import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
  user: {},
  token: '',
  currencies: [],
  assets: [],
  tracked: [],
  trackedCurrencyIds: [],
  valuationSettings: [],
  appConfig: {
    menuTrackedCoinsHighlight: false,
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
});
