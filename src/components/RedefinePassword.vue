<template>
  <div class="block">
    <div class="notification is-danger error-message-div" v-show="errorMessage">
      <button class="delete" @click="errorMessage = null"></button>
      <span>{{ errorMessage }}</span>
    </div>
    <div class="block main">
      <form v-on:submit.prevent>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              ref="password"
              type="password"
              v-model="password"
              autocomplete="password"
              placeholder="New password">
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
            <button class="button is-info" :disabled="!valid" @click="redefine">
              Redefine Password
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedefinePassword',
  props: ['token'],
  data() {
    return {
      password: '',
      confirmation: '',
      errorMessage: null,
    };
  },
  methods: {
    redefine() {
      if (!this.valid) {
        this.showRequiredMessage = true;
        return;
      }
      this.$store.dispatch('redefinePassword', { token: this.token, password: this.password })
        .then(() => this.$router.push({
          name: 'login',
          query: {
            message: 'Password redefined successfully. Please, login.',
          },
        }))
        .catch(error => this.showErrorMessage(error));
    },
    showErrorMessage(error) {
      this.errorMessage = (error.message || 'An error has occurred').toString().substr(0, 200);
    },
  },
  computed: {
    valid() {
      return this.password.length >= 6 && this.password === this.confirmation;
    },
  },
  mounted() {
    this.$refs.password.focus();
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
