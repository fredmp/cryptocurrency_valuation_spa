<template>
  <section>

    <app-header v-on:logout="logout"/>

    <div class="container is-fluid">
      <div class="notification is-danger" v-show="errorMessage">
        <button class="delete" @click="errorMessage = null"></button>
        <span>{{ errorMessage }}</span>
      </div>
      <router-view></router-view>
    </div>

    <app-footer/>

  </section>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export default {
  data() {
    return {
      title: 'Cryptocurrency Valuation Tool',
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
  components: {
    AppHeader,
    AppFooter,
  },
  created() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      this.$store.commit('setUser', JSON.parse(user));
      this.$store.commit('setToken', token);
      this.$router.push('all');
    } else {
      this.$store.commit('unsetUser');
      this.$store.commit('unsetToken');
      if (!this.$router.isPublic(this.$route.name)) this.$router.push('home');
    }
  },
};
</script>

<style>
.notification {
  margin-top: 20px;
}
</style>
