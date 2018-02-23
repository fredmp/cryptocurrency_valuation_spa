<template>
<div :class="{ 'modal': true, 'is-active': visible}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        <span>Untrack {{ trackedCurrency.currency.name }}</span>
      </p>
      <button class="delete" aria-label="close" @click="onClose"></button>
    </header>
    <section class="modal-card-body">
      Are you sure?
    </section>
    <footer class="modal-card-foot">
      <button class="button is-info" @click="onConfirm">Confirm</button>
      <button class="button" @click="onClose">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
export default {
  name: 'UntrackConfirmationModal',
  props: ['tracked', 'visible'],
  methods: {
    onClose() {
      this.$emit('close');
    },
    onConfirm() {
      this.$emit('confirm');
    },
  },
  computed: {
    trackedCurrency() {
      return this.tracked || { currency: {} };
    },
  },
};
</script>

<style scoped>

</style>
