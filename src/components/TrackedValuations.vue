<template>
  <div class="block">
    <div class="block">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Current Price</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input pointer has-text-right"
                type="text"
                :value="selected.currency.price | money"
                readonly>
            </div>
          </div>
        </div>
        <div class="field-label is-normal">
          <label class="label">Max Price</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input pointer has-text-right"
                type="text"
                :value="selected.currency.maxPrice | money"
                readonly>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Expected Price</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input pointer has-text-right"
                type="text"
                :value="selected.expectedPrice | money"
                readonly>
            </div>
          </div>
        </div>
        <div class="field-label is-normal">
          <label class="label">Expected Growth</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input pointer has-text-right"
                type="text"
                :value="selected.expectedGrowth + ' %'"
                readonly>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="notification is-danger error-message-div" v-show="errorMessage">
      <button class="delete" @click="errorMessage = null"></button>
      <span>{{ errorMessage }}</span>
    </div>
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <th class="table-header table-text has-text-left"><td>Name</td></th>
        <th class="table-header table-text has-text-left"><td>Description</td></th>
        <th class="table-header table-text has-text-centered"><td>Weight</td></th>
        <th class="table-header table-text has-text-centered"><td>Value</td></th>
      </thead>
      <tbody>
        <tr v-for="v in selected.valuations" :key="v.id">
          <td class="table-text has-text-left">{{ v.valuationSetting.name }}</td>
          <td class="table-text has-text-left">{{ v.valuationSetting.description }}</td>
          <td class="table-text has-text-centered">{{ v.valuationSetting.weight }}</td>
          <td class="table-text has-text-centered">
            <div class="select">
              <select
                :value="v.value"
                :disabled="updating === v.id"
                v-on:change="update(v, $event)">
                <option
                  v-for="i in Array.from(Array(v.valuationSetting.maxValue + 1).keys())"
                  :key="i"
                  :value="i">
                  {{ i }}
                </option>
              </select>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TrackedValuations',
  props: ['selected'],
  data() {
    return {
      errorMessage: null,
      updating: null,
    };
  },
  methods: {
    update(valuation, event) {
      this.updating = valuation.id;
      this.$store.dispatch(
        'updateValuation',
        { trackedCurrency: this.selected, valuation, value: event.target.value },
      ).then(() => {
        this.updating = null;
        this.$store.dispatch('fetchTracked').then(() => {
          const updatedValuation = this.$store.getters.tracked.find(t => t.id === this.selected.id);
          this.$emit('valuationUpdated', updatedValuation);
        });
      }).catch((error) => {
        this.updating = null;
        this.errorMessage = (error.message || 'An error has occurred').toString().substr(0, 80);
        const select = document.getElementById(valuation.id);
        if (select) {
          select.value = valuation.value;
        }
      });
    },
  },
};
</script>

<style scoped>
tr > td, div .select {
  vertical-align: middle;
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
.label {
  font-size: 0.9em;
}
.field-label {
  padding: 0;
  margin: auto 10px auto 5px;
  min-width: 120px;
}
.field-body {
  max-width: 200px;
}
.pointer {
  cursor: default;
}
</style>
