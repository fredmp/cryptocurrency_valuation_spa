import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import CurrencyList from '@/components/CurrencyList';
import Tracked from '@/components/Tracked';
import Assets from '@/components/Assets';
import Settings from '@/components/Settings';
import Register from '@/components/Register';
import Login from '@/components/Login';
import ForgotPassword from '@/components/ForgotPassword';
import RedefinePassword from '@/components/RedefinePassword';
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
  { path: '/', name: 'home', component: Home },
  { path: '/all', name: 'all', component: CurrencyList, beforeEnter: checkAuthentication },
  { path: '/tracked', name: 'tracked', component: Tracked, beforeEnter: checkAuthentication },
  { path: '/assets', name: 'assets', component: Assets, beforeEnter: checkAuthentication },
  { path: '/settings', name: 'settings', component: Settings, beforeEnter: checkAuthentication },
  { path: '/register', name: 'register', component: Register },
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: route => ({ initialEmail: route.query.email, initialMessage: route.query.message }),
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: ForgotPassword,
    props: route => ({ initialEmail: route.query.email }),
  },
  {
    path: '/redefine-password',
    name: 'redefinePassword',
    component: RedefinePassword,
    props: route => ({ token: route.query.token }),
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({ mode: 'history', routes });

router.isPublic = function (routeName) {
  return !routes.find(route => route.name === routeName && !!route.beforeEnter);
};

export default router;
