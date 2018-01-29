import Vue from 'vue';
import VueRouter from 'vue-router';
import CurrencyList from '@/components/CurrencyList';
import Tracked from '@/components/Tracked';
import Assets from '@/components/Assets';
import Settings from '@/components/Settings';
import Register from '@/components/Register';
import Login from '@/components/Login';
import Store from './../store/index';

Vue.use(VueRouter);

const checkAuthentication = function (to, from, next) {
  if (Store.getters.authenticated) {
    next();
  } else {
    next('/login');
  }
};

const routes = [
  { path: '/', name: 'all', component: CurrencyList, beforeEnter: checkAuthentication },
  { path: '/tracked', name: 'tracked', component: Tracked, beforeEnter: checkAuthentication },
  { path: '/assets', name: 'assets', component: Assets, beforeEnter: checkAuthentication },
  { path: '/settings', name: 'settings', component: Settings, beforeEnter: checkAuthentication },
  { path: '/register', name: 'register', component: Register },
  { path: '/login', name: 'login', component: Login },
  { path: '*', redirect: '/' },
];

export default new VueRouter({ mode: 'history', routes });
