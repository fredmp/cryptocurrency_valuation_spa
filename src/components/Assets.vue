<template>
  <div class="block">
    <spinner :show="loading"></spinner>
    <div class="block" v-show="!loading">
      <nav class="level">
        <div class="level-left">
          <div class="add-asset">
            <label>Add</label>
            <!-- @input="add" -->
            <v-select
              class="select-currency"
              v-model="selectedCurrency"
              :options="currencies"
              :disabled="adding">
            </v-select>
          </div>
        </div>
        <div class="level-right">
          <div class="field has-addons">
            <p class="control">
              <input
                type="text"
                v-model="filterBy"
                class="input search-bar"
                placeholder="Search...">
            </p>
            <p class="control">
              <a class="button is-info" @click="filter()">
                <icon name="search" label="Search"></icon>
              </a>
            </p>
          </div>
        </div>
      </nav>
    </div>
    <div class="block" v-show="!loading">
      <nav class="level">
        <div class="level-left"></div>
        <div class="level-right">
        </div>
      </nav>
    </div>
    <div class="block" v-show="!loading">
      <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th v-for="h in headers" :key="h.value">
            <td :id="h.value" :class="'table-header table-text has-text-' + h.align">
              <a @click="orderBy(h.value)">{{ h.text }}</a>
            </td>
          </th>
        </thead>
        <tbody>
          <tr
            v-for="a in assets"
            :key="a.id">
            <td class="table-text has-text-centered">
              <img :src="currencyIcon(a.currency.name)" :alt="a.currency.name">
            </td>
            <td class="table-text has-text-centered">{{ a.currency.symbol }}</td>
            <td class="table-text has-text-left padding-left">{{ a.currency.name }}</td>
            <td class="table-text has-text-right padding-right">{{ a.amount | round }}</td>
            <td class="table-text has-text-right padding-right">{{ a.btcValue | round }}</td>
            <td class="table-text has-text-right padding-right">{{ a.usdValue | round }}</td>
            <td class="table-text has-text-centered is-short">
              <a @click.capture="edit(a.id)" class="is-info">
                <icon name="edit" label="Edit"></icon>
              </a>
            </td>
            <td class="table-text has-text-centered is-short">
              <a @click.capture="remove(a.id)" class="is-danger">
                <icon name="times" label="Remove"></icon>
              </a>
            </td>
          </tr>
        </tbody>
        <tfoot v-show="assets.length > 0">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="has-text-right footer-total">0.14</td>
            <td class="has-text-right footer-total">$ 2,400.00</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="has-text-right footer-total">R$ 7.200,00</td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      {{ selectedCurrency }}
      <div class="chart">
        <doughnut-chart :label="'Assets'" :elements="chartElements"></doughnut-chart>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import DoughnutChart from '@/components/utils/DoughnutChart';
import Spinner from '@/components/utils/Spinner';

export default {
  name: 'Assets',
  data() {
    return {
      loading: false,
      adding: false,
      modal: false,
      filterBy: '',
      selectedCurrency: null,
      orderedAssets: [],
      headers: [
        { text: '#', value: 'image', align: 'centered' },
        { text: 'Symbol', value: 'symbol', align: 'centered' },
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Amount', value: 'amount', align: 'right' },
        { text: 'BTC Value', value: 'btcValue', align: 'right' },
        { text: 'USD Value', value: 'usdValue', align: 'right' },
        { text: 'Edit', value: 'edit', align: 'centered' },
        { text: 'Remove', value: 'remove', align: 'centered' },
      ],
    };
  },
  methods: {
    orderBy(field) {
      console.log(field);
    },
    filter() {
      // Filter
    },
    add() {
      // if (selected && selected.value) {
      //   // this.adding = true;
      //   // this.$store.dispatch('addAsset', { symbol: selected.value })
      //   //   .then(() => this.$store.dispatch('fetchAssets'))
      //   //   .then(() => {
      //   //     // this.orderBy();
      //   //     this.adding = false;
      //   //   })
      //   //   .catch((error) => {
      //   //     // Feedback notification
      //   //     console.log(error);
      //   //     this.adding = false;
      //   //   });
      // }
      console.log(this.selectedCurrency);
      this.selectedCurrency = { value: null };
    },
    edit(id) {
      console.log(id);
    },
    remove(id) {
      console.log(id);
    },
    currencyIcon(name) {
      try {
        const baseUrl = 'https://files.coinmarketcap.com/static/img/coins/32x32';
        return `${baseUrl}/${name.replace(/\s/g, '-').toLowerCase()}.png`;
      } catch (e) {
        return '';
      }
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
    chartElements() {
      return this.assets.map(
        (value, index) => ({
          label: value.currency.name,
          color: `#${this.generateColor(index)}`,
          data: value.usdValue,
        }));
    },
    currencies() {
      /* eslint-disable arrow-body-style */
      return this.$store.getters.currencies
        .filter(c => !this.assets.find(a => a.currency.symbol === c.symbol))
        .map((c) => {
          return { label: `${c.symbol} - ${c.name}`, value: c.symbol };
        });
      /* eslint-enable arrow-body-style */
    },
    assets() {
      return this.$store.getters.assets;
    },
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('fetchCurrencies')
      .then(() => this.$store.dispatch('fetchAssets'))
      .then(() => {
        this.orderedAssets = this.assets;
        // this.orderBy('rank');
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  },
  components: {
    vSelect,
    DoughnutChart,
    Spinner,
  },
};
</script>

<style scoped>
td {
  font-size: 0.95em;
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
div.chart {
  max-width: 40%;
  margin: auto;
}
tr td:first-child {
  padding-top: 4px !important;
  padding-bottom: 0px !important;
}
.footer-total {
  padding-bottom: 10px !important;
  padding-right: 12px !important;
}
.has-addons {
  margin-top: 40px;
}
.search-bar {
  width: 300px;
}
.padding-left {
  padding-left: 12px !important;
}
.padding-right {
  padding-right: 12px !important;
}
.add-asset {
  margin-top: 40px;
  margin-left: 4px;
}
.add-asset > label {
  margin-top: 8px;
  margin-right: 6px;
  display: inline-block;
  color: #3273dc;
}
</style>
