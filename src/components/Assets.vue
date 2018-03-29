<template>
  <div class="block">
    <spinner :show="loading"></spinner>
    <div class="block" v-show="!loading">
      <nav class="level">
        <div class="level-left">
          <div class="add-asset">
            <label>Add</label>
            <v-select
              ref="select"
              class="select-currency"
              @input="add"
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
    <div class="notification is-danger error-message-div" v-show="errorMessage">
      <button class="delete" @click="errorMessage = null"></button>
      <span>{{ errorMessage }}</span>
    </div>
    <div class="block" v-show="!loading">
      <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th v-for="h in headers" :key="h.value">
            <td
              :id="h.value"
              :class="'table-header table-text has-text-' + h.align">
              <a @click="orderBy(h.value)">{{ h.text }}</a>
            </td>
          </th>
        </thead>
        <tbody>
          <tr
            v-for="(a, index) in orderedAssets"
            :key="a.id"
            :class="{ 'fade': adding && index === 0 }">
            <td class="table-text has-text-centered">
              <currency-icon :symbol="a.currency.symbol"/>
            </td>
            <td class="table-text has-text-centered">{{ a.currency.symbol }}</td>
            <td class="table-text has-text-left padding-left">{{ a.currency.name }}</td>
            <td class="table-text has-text-right padding-right amount-td">
              <div class="amount-div">
                <span
                  v-show="editing !== a.id"
                  @click="editing = a.id">
                  {{ a.amount | round(8) }}
                </span>
                <input
                  v-show="editing === a.id"
                  v-amount-focus="editing === a.id"
                  @focus="$event.target.select()"
                  class="has-text-right amount-input"
                  type="text"
                  @blur="doneEdit(a, $event)"
                  @keyup.enter="doneEdit(a, $event)"
                  @keyup.esc="cancelEdit"
                  :value="a.amount">
              </div>
            </td>
            <td class="table-text has-text-right padding-right">{{ a.btcValue | round(8) }}</td>
            <td class="table-text has-text-right padding-right">{{ a.usdValue | autoRound }}</td>
            <td class="table-text has-text-centered is-short">
              <a @click.capture="editing = a.id" class="is-info">
                <icon name="edit" label="Edit"></icon>
              </a>
            </td>
            <td class="table-text has-text-centered is-short">
              <a @click.capture="remove(a.currency.symbol)" class="is-danger">
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
            <td class="amount-td"></td>
            <td class="has-text-right footer-total">{{ totalBtc | round(8) }}</td>
            <td class="has-text-right footer-total">$ {{ totalUsd | round }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr v-show="totalUserCurrency">
            <td></td>
            <td></td>
            <td></td>
            <td class="amount-td"></td>
            <td></td>
            <td class="has-text-right footer-total">
              {{ userLocalCurrency.symbol }} {{ totalUserCurrency | round }}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div class="chart">
        <doughnut-chart :label="'Assets'" :elements="chartElements"></doughnut-chart>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import _ from 'lodash';
import DoughnutChart from '@/components/common/DoughnutChart';
import CurrencyIcon from '@/components/common/CurrencyIcon';
import Spinner from '@/components/common/Spinner';
import { generateColor } from '@/utils/mixins';

export default {
  name: 'Assets',
  data() {
    return {
      loading: false,
      editing: null,
      adding: false,
      modal: false,
      filterBy: '',
      orderedBy: {},
      orderedAssets: [],
      totalUserCurrency: null,
      userCurrencyRate: null,
      errorMessage: null,
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
  directives: {
    'amount-focus': function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    totalUsd: function (newValue) {
      this.calculateTotalUserCurrency(newValue);
    },
    filterBy() {
      this.filter();
    },
    inAction(value) {
      const [loading, adding, editing] = value.split('|');
      if (loading !== 'false' || adding !== 'false' || editing !== 'null') {
        this.errorMessage = null;
      }
    },
  },
  methods: {
    orderBy(field, order) {
      this.orderedBy.field = field || this.orderedBy.field || 'usdValue';
      this.orderedBy.order = order || this.orderedBy.order === 'desc' ? 'asc' : 'desc';

      const currencyKeys = ['symbol', 'name'];
      this.orderedAssets = _.orderBy(this.assets, (obj) => {
        const isCurrency = currencyKeys.includes(this.orderedBy.field);
        const target = isCurrency ? obj.currency : obj;
        return isCurrency ?
          target[this.orderedBy.field] : parseFloat(target[this.orderedBy.field], 10);
      }, this.orderedBy.order);
    },
    filter() {
      this.orderedAssets = this.assets.filter((a) => {
        if (this.filterBy === '') return true;
        const assetKeys = ['amount', 'btcValue', 'usdValue'];
        const currencyKeys = ['symbol', 'name'];
        const query = this.filterBy.toLowerCase();

        return currencyKeys.some(key => (a.currency[key] || '').toString().toLowerCase().includes(query)) ||
               assetKeys.some(key => (a[key] || 0).toString().includes(query));
      });
    },
    add(newAsset) {
      if (newAsset && newAsset.value) {
        this.filterBy = '';
        this.adding = true;
        this.$store.dispatch('addAsset', { symbol: newAsset.value })
          .then(() => {
            this.$refs.select.clearSelection();
            return this.$store.dispatch('fetchAssets');
          })
          .then(() => {
            const asset = this.assets.find(a => a.currency.symbol === newAsset.value);
            if (asset) {
              this.orderedAssets.unshift(asset);
            }
            setTimeout(() => {
              this.adding = false;
            }, 3500);
          })
          .catch((error) => {
            this.adding = false;
            this.$refs.select.clearSelection();
            this.showErrorMessage(error);
          });
      }
    },
    doneEdit(asset, event) {
      if (event.target && event.target.value && event.target.value !== asset.amount) {
        this.$store.dispatch(
          'updateAsset',
          { symbol: asset.currency.symbol, amount: event.target.value })
          .then(() => this.$store.dispatch('fetchAssets'))
          .then(() => {
            const updatedAsset = this.assets.find(a => a.currency.symbol === asset.currency.symbol);
            if (updatedAsset) {
              asset.amount = updatedAsset.amount;
              asset.btcValue = updatedAsset.btcValue;
              asset.usdValue = updatedAsset.usdValue;
            }
            this.editing = null;
          }).catch((error) => {
            this.editing = null;
            this.showErrorMessage(error);
          });
      }
    },
    cancelEdit() {
      this.editing = null;
    },
    remove(symbol) {
      this.$store.dispatch('removeAsset', { symbol })
        .then(() => this.$store.dispatch('fetchAssets'))
        .then(() => {
          this.orderBy();
        }).catch((error) => {
          this.showErrorMessage(error);
        });
    },
    showErrorMessage(error) {
      this.errorMessage = (error.message || 'An error has occurred').toString().substr(0, 200);
    },
    calculateTotalUserCurrency(usdValue) {
      this.totalUserCurrency = null;
      if (this.userCurrencyRate) {
        this.totalUserCurrency = this.userCurrencyRate * usdValue;
      }
    },
  },
  computed: {
    chartElements() {
      return this.orderedAssets.filter(a => a.amount > 0).map(
        (value, index) => ({
          label: value.currency.name,
          color: `#${generateColor(index)}`,
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
    userLocalCurrency() {
      return this.$store.getters.localCurrency;
    },
    localCurrencyIsUSD() {
      return this.userLocalCurrency.name === 'USD';
    },
    assets() {
      return this.$store.getters.assets;
    },
    totalBtc() {
      return this.orderedAssets.reduce((acc, asset) => acc + asset.btcValue, 0);
    },
    totalUsd() {
      return this.orderedAssets.reduce((acc, asset) => acc + asset.usdValue, 0);
    },
    inAction() {
      return `${this.loading}|${this.adding}|${this.editing}`;
    },
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('fetchCurrencies')
      .then(() => this.$store.dispatch('fetchAssets'))
      .then(() => {
        this.orderBy();
        this.loading = false;

        if (!this.localCurrencyIsUSD) {
          this.$store.dispatch('exchangeRate', { symbol: this.userLocalCurrency.name }).then((rate) => {
            this.userCurrencyRate = rate;
            this.calculateTotalUserCurrency(this.totalUsd);
          });
        }
      })
      .catch((error) => {
        this.loading = false;
        this.showErrorMessage(error);
      });
  },
  components: {
    vSelect,
    DoughnutChart,
    CurrencyIcon,
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
td#amount, td.amount-td, .amount-div {
  width: 200px !important;
}
.amount-input {
  height: 22px;
  font-size: 1em;
}
.fade {
  animation: fade 1.8s infinite linear both;
}
@keyframes fade {
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
