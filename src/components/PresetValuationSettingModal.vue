<template>
<div :class="{ 'modal': true, 'is-active': active}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Choose the valuation settings you'd like to use</p>
      <button class="delete" aria-label="close" @click="close"></button>
    </header>
    <section class="modal-card-body">
      {{ presets }}
    </section>
    <footer class="modal-card-foot">
      <button
        @click="addAll"
        class="button is-info">
        Add all
      </button>
      <button class="button" @click="close">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
export default {
  name: 'PresetValuationSettingModal',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addAll() {
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    presets() {
      return this.$store.getters.presets;
    },
  },
};
</script>

<style scoped>
</style>
