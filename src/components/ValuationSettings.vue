<template>
  <div class="block main">
    <div class="box">
      <article class="media">
        <div class="media-left">
          <div>
            <icon
              name="exclamation-circle"
              class="is-warning"
              label="Info"
              scale=2>
            </icon>
          </div>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              Each setting defines a penalty applied to the fair price.
              The max value represents no penalty.
              Any other value represents a penalty based on the weight.
            </p>
            <p>
              For example: max value 5 and weight 20
              <icon name="long-arrow-right" label="Arrow"></icon>
              each part is <pre>20 / 5 = 4%</pre>.
              If you select 2 for a coin the fair price will be 12% less
              <pre>((5 - 2) * 4)</pre>.
            </p>
          </div>
        </div>
      </article>
    </div>
    <div class="block">
      <nav class="level">
        <div class="level-left">
        </div>
        <div class="level-right">
          <a class="button is-info" @click="add()">Add</a>
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
                <td class="table-text has-text-left">{{ v.name }}</td>
                <td class="table-text has-text-left">{{ v.description }}</td>
                <td class="table-text has-text-centered">{{ v.maxValue }}</td>
                <td class="table-text has-text-centered">{{ v.weight }} %</td>
                <td class="table-text has-text-centered is-short">
                  <a @click.capture="edit(v.id)" class="is-info">
                    <icon name="edit" label="Edit"></icon>
                  </a>
                </td>
                <td class="table-text has-text-centered is-short">
                  <a @click.capture="remove(v.id)" class="is-danger">
                    <icon name="times" label="Remove"></icon>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <spinner :show="loading"></spinner>
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
              <label class="label">Name</label>
              <div class="control">
                <input
                  v-model="valuation.name"
                  class="input"
                  type="text"
                  placeholder="Name"
                  required>
              </div>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <input
                  v-model="valuation.description"
                  class="input"
                  type="text"
                  placeholder="Description">
              </div>
            </div>
            <div class="field">
              <label class="label">Max Value</label>
              <div class="control">
                <div class="select">
                  <select
                    v-model="valuation.maxValue"
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
                  v-model="valuation.weight"
                  class="input is-short"
                  type="text"
                  placeholder="Weight"
                  required>
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button
            @click="save"
            :disabled="!valid"
            class="button is-info">
            Save changes
          </button>
          <button class="button" @click="clear">Cancel</button>
        </footer>
      </div>
    </div>
    <div class="chart">
      <doughnut-chart :label="'Valuation Settings'" :elements="chartElements"></doughnut-chart>
    </div>
  </div>
</template>

<script>
import DoughnutChart from '@/components/utils/DoughnutChart';
import Spinner from '@/components/utils/Spinner';

export default {
  data: () => ({
    modal: false,
    valuation: { name: '', description: '', maxValue: '', weight: '' },
    items: [1, 2, 3, 4, 5],
    loading: false,
    headers: [
      { text: 'Name', value: 'name', align: 'left' },
      { text: 'Description', value: 'description', align: 'left' },
      { text: 'Max Value', value: 'maxValue', align: 'centered' },
      { text: 'Weight', value: 'weight', align: 'centered' },
      { text: 'Edit', value: 'edit', align: 'centered' },
      { text: 'Remove', value: 'remove', align: 'centered' },
    ],
  }),
  methods: {
    add() {
      this.modal = true;
      this.valuation = { name: '', description: '', maxValue: '', weight: '' };
    },
    save() {
      if (!this.valid) return;
      if (this.valuation.id) {
        this.$store.dispatch('updateValuationSetting', this.valuation);
      } else {
        this.$store.dispatch('addValuationSetting', this.valuation);
      }
      this.clear();
    },
    remove(valuationId) {
      this.$store.dispatch('removeValuationSetting', valuationId);
    },
    edit(valuationId) {
      const found = this.valuations.find(v => v.id === valuationId);
      const { id, name, description, maxValue, weight } = found;
      this.valuation = { id, name, description, maxValue, weight };
      this.modal = true;
    },
    clear() {
      this.modal = false;
      this.valuation = { name: '', description: '', maxValue: '', weight: '' };
    },
    generateColor(index) {
      const colors = [
        '27BDDB', 'FF455A', '32CD90', '5330A2', 'FFDD52', '077187', 'F4F1BB', '74A57F',
        '9ECE9A', 'E4C5AF', 'ED6A5A', '9BC1BC', '5CA4A9', '074F57', 'E6EBE0', 'DCEDFF',
        '94B0DA', '8F91A2', 'A63446', '58B09C', 'F3B3A6', '1282A2', '62929E', 'DB5461',
      ];
      return `${index < 24 ? colors[index] : this.generateColor(index - 24)}`;
    },
  },
  computed: {
    valuations() {
      return this.$store.getters.valuationSettings;
    },
    valid() {
      return typeof this.valuation.maxValue === 'number' &&
        this.valuation.maxValue > 0 &&
        this.valuation.name.length > 0 &&
        this.valuation.weight.length > 0;
    },
    chartElements() {
      return this.valuations.map(
        (value, index) => ({
          label: value.name,
          color: `#${this.generateColor(index)}`,
          data: value.weight,
        }));
    },
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('fetchValuationSettings').then(() => {
      this.loading = false;
    });
  },
  components: {
    DoughnutChart,
    Spinner,
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
  input.is-short {
    width: 180px;
  }
  td.is-short {
    width: 50px;
  }
  td > a.is-danger {
    color: #ff3860;
  }
  td > a.is-info {
    color: #209cee;
  }
  svg.is-warning {
    color: #ffdd57;
    display: block;
  }
  .media-left {
    margin: auto;
    margin-right: 15px;
  }
  .media-content {
    margin: auto;
  }
  .content > p {
    margin: auto;
  }
  .content > p > pre {
    padding: 0px;
    margin: 0px;
    display: inline;
  }
  .content > p > svg {
    padding: 0px;
    margin: 0px;
    display: inline;
    vertical-align: middle;
  }
  .main {
    padding-bottom: 150px;
  }
  div.chart {
    max-width: 40%;
    margin: auto;
  }
</style>
