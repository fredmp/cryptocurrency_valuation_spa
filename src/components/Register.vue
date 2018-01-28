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
              v-on:blur="checkValidOrEmptyEmail"
              autocomplete="email"
              placeholder="Enter your email">
            <span class="icon is-small is-left">
              <icon name="envelope" label="Envelope"></icon>
            </span>
            <span class="icon is-small is-right">
              <icon name="check" label="Check"></icon>
            </span>
          </p>
          <p class="help is-danger" v-show="!validOrEmptyEmail">
            Invalid email
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              v-model="password"
              autocomplete="password"
              placeholder="Choose your password">
            <span class="icon is-small is-left">
              <icon name="lock" label="Lock"></icon>
            </span>
          </p>
          <p
            class="help is-danger"
            v-show="password.length > 0 && password.length < 6">
            Password must have at least 6 digits
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              v-model="confirmation"
              autocomplete="password"
              placeholder="Retype your password">
            <span class="icon is-small is-left">
              <icon name="lock" label="Lock"></icon>
            </span>
          </p>
          <p
            class="help is-danger"
            v-show="confirmation.length > 0 && password !== confirmation">
            Password does not match confirmation
          </p>
        </div>
        <div class="field">
          <p class="control has-text-right">
            <button class="button is-info" :disabled="!valid" @click="register">
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from '@/utils/mixins';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      confirmation: '',
      validOrEmptyEmail: true,
      errorMessage: null,
    };
  },
  methods: {
    register() {
      if (!this.valid) {
        this.showRequiredMessage = true;
        return;
      }
      this.$store.dispatch('createUser', { email: this.email, password: this.password })
        .then(() => this.$router.push('all'))
        .catch(error => this.showErrorMessage(error));
    },
    checkValidOrEmptyEmail() {
      this.validOrEmptyEmail = this.email.length === 0 || isValidEmail(this.email);
    },
    showErrorMessage(error) {
      this.errorMessage = (error.message || 'An error has occurred').toString().substr(0, 200);
    },
  },
  computed: {
    valid() {
      return isValidEmail(this.email) &&
             this.password.length >= 6 &&
             this.password === this.confirmation;
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
.help {
  margin-left: 15px;
}
.notification {
  margin-top: 20px;
}
</style>
