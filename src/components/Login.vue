<template>
  <div class="block">
    <div class="notification is-warning" v-show="infoMessage">
      <button class="delete" @click="infoMessage = null"></button>
      <span>{{ infoMessage }}</span>
    </div>
    <div class="notification is-danger" v-show="errorMessage">
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
        <div class="field password-div">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              v-model="password"
              v-on:focus="showRequiredMessage = false"
              v-on:enter="login"
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
        <a class="forgot-password" @click="forgotPassword">Forgot Password?</a>
        <div class="field">
          <p class="control has-text-right">
            <button class="button is-info" @click="login">Login</button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: ['initialEmail', 'initialMessage'],
  data() {
    return {
      email: this.initialEmail || '',
      password: '',
      showRequiredMessage: false,
      errorMessage: null,
      infoMessage: this.initialMessage,
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
    forgotPassword() {
      this.$router.push({ name: 'forgotPassword', query: { email: this.email } });
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
.password-div {
  margin-bottom: 2px;
}
.forgot-password {
  font-size: 0.8rem;
  padding-left: 4px;
}
</style>
