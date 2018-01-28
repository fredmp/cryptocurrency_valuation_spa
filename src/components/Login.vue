<template>
  <div class="block">
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
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showRequiredMessage: false,
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
      console.log(error);
    },
  },
  mounted() {
    this.$refs.email.focus();
  },
};
</script>

<style scoped>
.block {
  margin: 50px auto 20px auto;
  width: 350px;
}
</style>
