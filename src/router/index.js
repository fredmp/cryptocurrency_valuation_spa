import Vue from 'vue'
import VueRouter from 'vue-router'
import CurrencyList from '@/components/CurrencyList'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'CurrencyList', component: CurrencyList },
  { path: '*', redirect: '/' }
]

export default new VueRouter({ mode: 'history', routes })
