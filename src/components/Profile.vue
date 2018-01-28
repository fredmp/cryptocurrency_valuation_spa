<template>
  <div class="block">
    <div class="notification is-warning" v-show="successMessage">
      <button class="delete" @click="successMessage = null"></button>
      <span>{{ successMessage }}</span>
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
              type="text"
              ref="name"
              v-model="userName"
              autocomplete="name"
              placeholder="Change your name">
            <span class="icon is-small is-left">
              <icon name="user" label="User"></icon>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              ref="email"
              v-model="email"
              v-on:blur="checkValidOrEmptyEmail"
              autocomplete="email"
              placeholder="Change your email">
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
          <div class="control has-icons-left">
            <v-select
              ref="select"
              class="select-currency"
              v-model="localCurrency"
              :options="localCurrenciesForDropdown">
            </v-select>
          </div>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              v-model="password"
              autocomplete="password"
              placeholder="Change your password">
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
            <button class="button is-info" :disabled="!changed || !valid" @click="save">
              Save
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import { isValidEmail } from '@/utils/mixins';

export default {
  name: 'Profile',
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      confirmation: '',
      localCurrency: null,
      validOrEmptyEmail: true,
      successMessage: null,
      errorMessage: null,
    };
  },
  methods: {
    save() {
      const params = {};
      if (this.email) params.email = this.email;
      if (this.userName) params.name = this.userName;
      if (this.password) params.password = this.userName;
      if (this.localCurrency) params.localCurrency = this.localCurrency;

      if (Object.keys(params).length > 0) {
        params.id = this.user.id;
        this.$store.dispatch('updateUser', params)
          .then(() => {
            this.showSuccessMessage('User updated successfully');
          })
          .catch(error => this.showErrorMessage(error.message));
      }
    },
    checkValidOrEmptyEmail() {
      this.validOrEmptyEmail = !this.email || isValidEmail(this.email);
    },
    showSuccessMessage(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = null;
      }, 2500);
    },
    showErrorMessage(message) {
      this.errorMessage = (message || 'An error has occurred').toString().substr(0, 200);
    },
  },
  computed: {
    valid() {
      const emailOk = !this.email || isValidEmail(this.email);
      const passwordOk = !this.password ||
                        (this.password.length >= 6 && this.password === this.confirmation);
      return emailOk && passwordOk;
    },
    changed() {
      const nameChanged = this.userName && this.user.name !== this.userName;
      const emailChanged = this.email && this.user.email !== this.email;
      const passwordChanged = this.password;
      const currencyChanged = this.localCurrency &&
                              this.user.localCurrency !== this.localCurrency.value;

      return nameChanged || emailChanged || passwordChanged || currencyChanged;
    },
    localCurrenciesForDropdown() {
      /* eslint-disable arrow-body-style */
      return this.localCurrencies.map((c) => {
        return { label: `${c.symbol} - ${c.name}`, value: c.name };
      });
    },
    localCurrencies() {
      return this.$store.getters.localCurrencies;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.$refs.name.focus();
    this.userName = this.user.name;
    this.email = this.user.email;
    const currency = this.localCurrencies.find(c => c.name === this.user.localCurrency) ||
                     this.localCurrencies[0];
    this.localCurrency = { label: `${currency.symbol} - ${currency.name}`, value: currency.name };
  },
  components: {
    vSelect,
  },
};
</script>

<style scoped>
.main {
  margin: 50px auto 20px auto;
  width: 450px;
}
.help {
  margin-left: 15px;
}
.notification {
  margin-top: 20px;
}
</style>
