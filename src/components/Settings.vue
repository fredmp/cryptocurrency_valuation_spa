<template>
  <v-tabs fixed centered>
    <v-tabs-bar>
      <v-tabs-slider></v-tabs-slider>
      <v-tabs-item
        v-for="(item, key, index) in items"
        :key="index"
        :href="'#tab-' + index"
      >
        {{ item }}
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for="(item, key, index) in items"
        :key="index"
        :id="'tab-' + index"
      >
        <component :is="key"></component>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
  import ValuationSettings from '@/components/ValuationSettings'
  import Profile from '@/components/Profile'

  export default {
    data () {
      return {
        items: {
          ValuationSettings: 'Valuation Settings',
          Profile: 'Profile'
        }
      }
    },
    components: {
      ValuationSettings,
      Profile
    }
  }
</script>

<style scoped>
</style>
