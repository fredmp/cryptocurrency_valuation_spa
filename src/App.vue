<template>
  <div>
    <nav class="navbar is-link">
      <div class="navbar-brand">
        <a class="navbar-item" href="">
          <h1 class="title is-5">Crypto Currency Valuation Tool</h1>
        </a>
        <div class="navbar-burger burger" data-target="navMenuColorlink-example">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-end">
        <a href="#" class="navbar-item" @click="$router.push('all')">All Coins</a>
        <a
          href="#"
          :class="{ 'navbar-item': true, 'shake2': appConfig.menuTrackedCoinsHighlight }"
          @click="$router.push('tracked')">
          Tracked Coins
        </a>
        <a href="#" class="navbar-item" @click="$router.push('assets')">My Assets</a>
        <a href="#" class="navbar-item" @click="$router.push('settings')">Settings</a>
      </div>
    </nav>

    <div class="container">
      <router-view></router-view>
    </div>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Crypto Currency Valuation Tool</strong> by <a href="http://about.me/fredericomartins">Frederico Martins</a> for <a href="https://www.linkedin.com/company/cosmos-tecnologia/">Cosmos Tecnologia</a> - 2018
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Crypto Currency Valuation Tool',
    };
  },
  computed: {
    appConfig() {
      return this.$store.getters.appConfig;
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
