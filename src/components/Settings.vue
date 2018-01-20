<template>
  <div class="block">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': currentComponent === 'valuation-settings' }">
          <a @click="currentComponent = 'valuation-settings'">
            Valuation Settings
          </a>
        </li>
        <li :class="{ 'is-active': currentComponent === 'profile' }">
          <a @click="currentComponent = 'profile'">
            Profile
          </a>
        </li>
      </ul>
    </div>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import ValuationSettings from '@/components/ValuationSettings';
import Profile from '@/components/Profile';

export default {
  data() {
    return {
      items: {
        ValuationSettings: 'Valuation Settings',
        Profile: 'Profile',
      },
      currentComponent: 'valuation-settings',
    };
  },
  components: {
    ValuationSettings,
    Profile,
  },
};
</script>

<style scoped>
.tabs {
  margin-top: 20px;
}
</style>
