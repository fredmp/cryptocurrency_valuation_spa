import Vue from 'vue';
import VueRouter from 'vue-router';
import CurrencyList from '@/components/CurrencyList';
import Settings from '@/components/Settings';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'currencies', component: CurrencyList },
  { path: '/settings', name: 'settings', component: Settings },
  { path: '*', redirect: '/' },
];

export default new VueRouter({ mode: 'history', routes });
