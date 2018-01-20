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
        <a href="#" class="navbar-item" @click="$router.push('currencies')">Home</a>
        <a href="#" class="navbar-item" @click="$router.push('settings')">Settings</a>
      </div>
    </nav>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Crypto Currency Valuation Tool',
    };
  },
};
</script>

<style>
</style>
