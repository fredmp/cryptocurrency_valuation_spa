// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Axios from 'axios';

import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

import App from './App';
import router from './router';
import store from './store/index';

require('./assets/sass/main.scss');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

if (process.env.NODE_ENV === 'production') {
  Axios.defaults.baseURL = 'https://cryptocurrency-valuation-api.herokuapp.com/';
} else {
  Axios.defaults.baseURL = 'http://localhost:3000/';
}

Axios.defaults.headers.get.Accepts = 'application/json';

Axios.interceptors.request.use((config) => {
  // Also check the request domain
  if (store.getters.token && config.url.startsWith('/')) {
    config.headers.authorization = store.getters.token;
  }
  return config;
});

Axios.interceptors.response.use((response) => {
  const token = response.headers.authorization;
  // Also check the response origin before to set the token
  if (token) store.commit('setToken', token);
  return response;
}, (error) => {
  if (error.response.status === 401) {
    store.commit('unsetUser');
    store.commit('unsetToken');
    if (error.config.url.endsWith('login')) throw new Error(error.response.data.message);
    router.push('login');
  }
  return error.response;
});

Vue.component('icon', Icon);

Vue.filter('round', function (value, precision = 2) {
  if (!value) {
    value = 0;
  }
  return parseFloat(value).toFixed(precision);
});

Vue.filter('autoRound', function (value) {
  if (!value) {
    value = 0;
  }
  const precision = value >= 1 ? 2 : 6;
  return parseFloat(value).toFixed(precision);
});

Vue.filter('humanizeBoolean', function (value) {
  if (value === undefined || value === null) {
    return '';
  }
  return value ? 'Yes' : 'No';
});

Vue.filter('money', function (value) {
  try {
    return formatter.format(value);
  } catch (e) {
    return value;
  }
});

Vue.filter('moneyMagnitude', function (value) {
  try {
    const size = parseInt(value, 10).toFixed(0).length;
    if (size > 12) return 'Trillions';
    if (size > 9) return 'Billions';
    if (size > 6) return 'Millions';
    if (size > 3) return 'Thousands';
    if (size > 2) return 'Hundreds';
    return size;
  } catch (e) {
    return '';
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
