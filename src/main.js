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
  Axios.defaults.baseURL = 'https://crypto-currency-valuation-api.herokuapp.com/';
} else {
  Axios.defaults.baseURL = 'http://localhost:3000/';
}

Axios.defaults.headers.get.Accepts = 'application/json';

Vue.component('icon', Icon);

Vue.filter('round', function (value) {
  if (!value) {
    value = 0;
  }
  return parseFloat(value).toFixed(2);
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

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
