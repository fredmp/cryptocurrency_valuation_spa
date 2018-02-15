import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
  user: null,
  token: null,
  popular: [],
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
    { name: 'CHF', symbol: 'CHF' },
    { name: 'BRL', symbol: 'R$' },
  ],
  presets: [
    { name: 'Fees', description: 'What is the fee impact - greater is better (cheaper)', maxValue: 5, weight: 10 },
    { name: 'Active Developers', description: 'Is there a reasonable number of developers contributing to the project?', maxValue: 5, weight: 15 },
    { name: 'Quality of the Project', description: 'What is the quality of the codebase? Does it have enough tests?', maxValue: 5, weight: 10 },
    { name: 'Wallet Quality', description: 'Does it offer secure and friendly wallets?', maxValue: 5, weight: 5 },
    { name: 'Roadmap Quality', description: 'Does it have a good roadmap? Is it been accomplished?', maxValue: 5, weight: 5 },
    { name: 'Innovation Level', description: 'How innovative is the project? Is it just a fork or something really new?', maxValue: 10, weight: 20 },
    { name: 'Inflation Level', description: 'Is it inflationary? (greater rates means inflation does not affect it negatively)', maxValue: 3, weight: 5 },
    { name: 'Performance', description: 'Does it show a acceptable performace level? Are the transactions settled fast?', maxValue: 10, weight: 15 },
    { name: 'Scalability', description: 'Is it working well with a huge number of transactions per second?', maxValue: 10, weight: 15 },
  ],
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
});
