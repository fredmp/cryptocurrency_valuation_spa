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
          <p class="control has-text-centered">
            <button class="button is-info is-outlined is-rounded" @click="recoverPassword">
              Send email to create a new password
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  props: ['initialEmail'],
  data() {
    return {
      email: this.initialEmail,
      showRequiredMessage: false,
      errorMessage: null,
    };
  },
  methods: {
    recoverPassword() {
      if (!this.email) {
        this.showRequiredMessage = true;
        return;
      }
      this.$store.dispatch('recoverPassword', { email: this.email })
        .then(() => this.$router.push({
          name: 'login',
          query: {
            email: this.email,
            message: 'Email was sent successfully. Please, check your inbox.',
          },
        }))
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
</style>
