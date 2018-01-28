<template>
  <div class="block">
    <div class="notification is-danger error-message-div" v-show="errorMessage">
      <button class="delete" @click="errorMessage = null"></button>
      <span>{{ errorMessage }}</span>
    </div>
    <div class="block main">
      <form v-on:submit.prevent>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              ref="email"
              v-model="email"
              v-on:focus="showRequiredMessage = false"
              autocomplete="email"
              placeholder="Email">
            <span class="icon is-small is-left">
              <icon name="envelope" label="Envelope"></icon>
            </span>
            <span class="icon is-small is-right">
              <icon name="check" label="Check"></icon>
            </span>
          </p>
          <p class="help is-danger" v-show="showRequiredMessage && email.length < 1">
            Email is required
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              v-model="password"
              v-on:focus="showRequiredMessage = false"
              autocomplete="password"
              placeholder="Password">
            <span class="icon is-small is-left">
              <icon name="lock" label="Lock"></icon>
            </span>
          </p>
          <p class="help is-danger" v-show="showRequiredMessage && password.length < 1">
            Password is required
          </p>
        </div>
        <div class="field">
          <p class="control has-text-right">
            <button class="button is-info" @click="login">
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showRequiredMessage: false,
      errorMessage: null,
    };
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        this.showRequiredMessage = true;
        return;
      }
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .then(() => this.$router.push('all'))
        .catch(error => this.showErrorMessage(error));
    },
    showErrorMessage(error) {
      this.errorMessage = (error.message || 'An error has occurred').toString().substr(0, 200);
    },
  },
  mounted() {
    this.$refs.email.focus();
  },
};
</script>

<style scoped>
.main {
  margin: 50px auto 20px auto;
  width: 350px;
}
.notification {
  margin-top: 20px;
}
</style>
