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
        <a class="navbar-item" @click="logout" v-show="isAuthenticated">
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

    <div class="container">
      <div class="notification is-danger" v-show="errorMessage">
        <button class="delete" @click="errorMessage = null"></button>
        <span>{{ errorMessage }}</span>
      </div>
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
      errorMessage: null,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('login'))
        .catch((error) => {
          this.errorMessage = error.message;
        });
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
  mounted() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      this.$store.commit('setUser', JSON.parse(user));
      this.$store.commit('setToken', token);
      this.$router.push('all');
    } else {
      this.$store.commit('unsetUser');
      this.$store.commit('unsetToken');
      if (!this.$router.isPublic(this.$route.name)) this.$router.push('login');
    }
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
.notification {
  margin-top: 20px;
}
</style>
