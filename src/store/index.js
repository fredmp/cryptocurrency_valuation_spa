import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
  user: null,
  token: null,
  currencies: [],
  assets: [],
  tracked: [],
  trackedCurrencyIds: [],
  valuationSettings: [],
  appConfig: {
    menuTrackedCoinsHighlight: false,
  },
  localCurrencies: [
    { name: 'USD', symbol: '$' },
    { name: 'EUR', symbol: '€' },
    { name: 'JPY', symbol: '¥' },
    { name: 'GBP', symbol: '£' },
    { name: 'CAD', symbol: '$' },
    { name: 'ARS', symbol: '$' },
    { name: 'CHF', symbol: 'CHF' },
    { name: 'BRL', symbol: 'R$' },
  ],
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
});
