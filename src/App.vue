<template>
  <v-app>
    <v-toolbar fixed app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="$router.push('currencies')">Home</v-btn>
        <v-btn flat @click="$router.push('settings')">Settings</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <router-view></router-view>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Crypto Currency Valuation Tool'
      }
    }
  }
</script>

<style>
  .toolbar {
    background-color: #006fff !important;
    color: #ffffff !important;
  }
  .toolbar__items > button {
    color: #ffffff !important;
  }
</style>
