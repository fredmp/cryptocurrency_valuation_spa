// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import { store } from './store/index'

if (process.env.NODE_ENV === 'production') {
  Axios.defaults.baseURL = 'https://crypto-currency-valuation-api.herokuapp.com/'
} else {
  Axios.defaults.baseURL = 'http://localhost:3000/'
}

Axios.defaults.headers.get['Accepts'] = 'application/json'

Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.filter('round', function (value) {
  if (!value) {
    value = 0
  }
  return parseFloat(value).toFixed(2)
})

Vue.filter('humanizeBoolean', function (value) {
  if (value === undefined || value === null) {
    return ''
  }
  return value ? 'Yes' : 'No'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
