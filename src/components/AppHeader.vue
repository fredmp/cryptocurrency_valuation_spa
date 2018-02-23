<template>
  <nav class="navbar is-link">
    <div class="navbar-brand">
      <a class="navbar-item" href="">
        <h1 class="main-title is-5">Cryptocurrency Valuation Tool</h1>
      </a>
      <div class="navbar-burger burger" data-target="navMenuColorlink-example">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-end">
      <a class="navbar-item" @click="$router.push('home')">
        Home
      </a>
      <a class="navbar-item" @click="$router.push('all')" v-show="isAuthenticated">
        All Coins
      </a>
      <a
        :class="{ 'navbar-item': true, 'shake2': appConfig.menuTrackedCoinsHighlight }"
        @click="$router.push('tracked')"
          v-show="isAuthenticated">
        Tracked Coins
      </a>
      <a class="navbar-item" @click="$router.push('assets')" v-show="isAuthenticated">
        My Assets
      </a>
      <a class="navbar-item" @click="$router.push('settings')" v-show="isAuthenticated">
        Settings
      </a>
      <a class="navbar-item" @click="onLogout" v-show="isAuthenticated">
        Logout
      </a>
      <a class="navbar-item" @click="$router.push('login')" v-show="!isAuthenticated">
        Login
      </a>
      <a class="navbar-item" @click="$router.push('register')" v-show="!isAuthenticated">
        Register
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    onLogout() {
      this.$emit('logout');
    },
  },
  computed: {
    appConfig() {
      return this.$store.getters.appConfig;
    },
    isAuthenticated() {
      return this.$store.getters.token && this.$store.getters.user;
    },
  },
};
</script>

<style>
.navbar {
  height: 70px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
.shake2 {
  animation: shake2 .4s infinite linear both;
}
@keyframes shake2 {
  from, to {
    transform: translate3d(-10px, 0, 0);
  }
  50% {
    transform: translate3d(10px, 0, 0);
  }
}
</style>
