<template>
  <div class="block">
    <div class="block">
      <nav class="level">
        <div class="level-left"></div>
        <div class="level-right">
          <a class="button is-info" @click="modal = true">Add</a>
        </div>
      </nav>
    </div>
    <div class="block">
      <div class="block">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <th v-for="h in headers" :key="h.value">
                <td :id="h.value" :class="'table-header table-text has-text-' + h.align">
                  {{ h.text }}
                </td>
              </th>
            </thead>
            <tbody>
              <tr v-for="v in valuations" :key="v.description">
                <td class="table-text has-text-left">{{ v.description }}</td>
                <td class="table-text has-text-centered">{{ v.from }}</td>
                <td class="table-text has-text-centered">{{ v.to }}</td>
                <td class="table-text has-text-centered">{{ v.weight }}</td>
                <td class="table-text has-text-centered">{{ v.liquidity }}
                  <a @click.capture="remove(v.id)">
                    <icon name="times" label="Remove"></icon>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
    <div :class="{ 'modal': true, 'is-active': modal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add new valuation setting</p>
          <button class="delete" aria-label="close" @click="clear"></button>
        </header>
        <section class="modal-card-body">
          <form ref="form" lazy-validation>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <input
                  v-model="description"
                  class="input"
                  type="text"
                  placeholder="Description"
                  required>
              </div>
            </div>
            <div class="field">
              <label class="label">From</label>
              <div class="control">
                <div class="select">
                  <select
                    v-model="initialRange"
                    required>
                    <option v-for="i in items" :key="i" :value="i">{{ i }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">To</label>
              <div class="control">
                <div class="select">
                  <select
                    v-model="finalRange"
                    required>
                    <option v-for="i in items" :key="i" :value="i">{{ i }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Weight</label>
              <div class="control">
                <input
                  v-model="weight"
                  class="input short-input"
                  type="text"
                  placeholder="Weight"
                  required>
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button
            @click="add"
            :disabled="!valid"
            class="button is-info">
            Save changes
          </button>
          <button class="button" @click="clear">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    modal: false,
    description: '',
    weight: '',
    initialRange: null,
    finalRange: null,
    items: [1, 2, 3, 4, 5],
    headers: [
      { text: 'Description', value: 'description', align: 'left' },
      { text: 'From', value: 'from', align: 'centered' },
      { text: 'To', value: 'to', align: 'centered' },
      { text: 'Weight', value: 'weight', align: 'centered' },
      { text: 'Remove', value: 'remove', align: 'centered' },
    ],
  }),
  methods: {
    validateRange() {
      return !!this.initialRange && !!this.finalRange && this.initialRange < this.finalRange;
    },
    add() {
      if (!this.valid) return;
      const valuation = {
        description: this.description,
        from: this.initialRange,
        to: this.finalRange,
        weight: this.weight,
      };
      this.$store.dispatch('addValuationSetting', valuation);
      this.clear();
    },
    remove(valuationId) {
      this.$store.dispatch('removeValuationSetting', valuationId);
    },
    clear() {
      this.description = '';
      this.initialRange = null;
      this.finalRange = null;
      this.weight = '';
      this.modal = false;
    },
  },
  computed: {
    valuations() {
      return this.$store.getters.valuationSettings;
    },
    valid() {
      return this.validateRange() && this.description.length > 0 && this.weight.length > 0;
    },
  },
  mounted() {
    this.$store.dispatch('fetchValuationSettings');
  },
};
</script>

<style scoped>
  i {
    cursor: pointer;
  }
  th > td {
    color: rgba(0, 0, 0, 0.54);
  }
  tr td:first-child {
    padding-left: 10px;
  }
  .short-input {
    width: 180px;
  }
</style>
