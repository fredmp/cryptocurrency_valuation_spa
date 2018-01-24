<template>
  <div class="block">
    <div class="notification is-danger error-message-div" v-show="errorMessage">
      <button class="delete" @click="errorMessage = null"></button>
      <span>{{ errorMessage }}</span>
    </div>
    <div class="block">
      <div class="field">
        <p class="control">
          <textarea v-model="notes" class="textarea" placeholder="Notes..."></textarea>
        </p>
      </div>
      <div class="update-button-div">
        <button class="button is-info" @click="update()" :disabled="updating === selected.id">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrackedNotes',
  props: ['selected'],
  data() {
    return {
      errorMessage: null,
      updating: null,
      notes: null,
    };
  },
  methods: {
    update() {
      this.updating = this.selected.id;
      this.$store.dispatch('updateTracked', { symbol: this.selected.currency.symbol, notes: this.notes })
        .then(() => this.$store.dispatch('fetchTracked'))
        .then(() => {
          const updatedValuation = this.$store.getters.tracked.find(t => t.id === this.selected.id);
          this.updating = null;
          this.$emit('valuationUpdated', updatedValuation);
        })
        .catch((error) => {
          this.updating = null;
          this.errorMessage = (error.message || 'An error has occurred').toString().substr(0, 80);
        });
    },
  },
  mounted() {
    this.notes = this.selected.notes;
  },
};
</script>

<style scoped>
textarea {
  height: 370px;
}
.error-message-div {
  text-align: center;
  vertical-align: middle;
  min-height: 15px;
  max-height: 15px;
  margin-bottom: 15px;
}
.error-message-div > span {
  vertical-align: middle;
  position: relative;
  top: -0.65rem;
  padding-left: 15px;
}
.update-button-div {
  text-align: right;
}
</style>
