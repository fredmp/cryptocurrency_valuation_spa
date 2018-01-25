import Vue from 'vue';
import VueRouter from 'vue-router';
import CurrencyList from '@/components/CurrencyList';
import Tracked from '@/components/Tracked';
import Assets from '@/components/Assets';
import Settings from '@/components/Settings';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'all', component: CurrencyList },
  { path: '/tracked', name: 'tracked', component: Tracked },
  { path: '/assets', name: 'assets', component: Assets },
  { path: '/settings', name: 'settings', component: Settings },
  { path: '*', redirect: '/' },
];

export default new VueRouter({ mode: 'history', routes });
