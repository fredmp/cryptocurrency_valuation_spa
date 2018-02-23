<template>
<div class="block">
  <div class="block">
    <nav class="level">
      <div class="level-left"></div>
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
  <untrack-confirmation-modal
      :tracked="selected"
      :visible="untrackConfirmationModalOpen"
      v-on:confirm="untrack"
      v-on:close="cancelUntrack"/>
  <tracked-modal
      :tracked="selected"
      :visible="trackedModalOpen"
      v-on:confirm="confirmUntrack"
      v-on:close="trackedModalOpen = false"
      v-on:valuationUpdated="valuationUpdated"/>
  <div class="block">
    <tip>
      &nbsp;You need to evaluate each tracked coin to change the expected growth
      (click on the coin and update the settings in "Valuations" tab).
    </tip>
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <th v-for="h in headers" :key="h.value">
          <td :id="h.value" :class="'table-header table-text has-text-' + h.align">
            <a @click="orderBy(h.value)">{{ h.text }}</a>
          </td>
        </th>
      </thead>
      <tbody>
        <tr v-for="t in orderedTracked" :key="t.id" @click="openModal(t)">
          <td class="table-text has-text-centered">{{ t.currency.rank }}</td>
          <td class="table-text has-text-centered">
            <currency-icon :symbol="t.currency.symbol" size="24"/>
          </td>
          <td class="table-text has-text-left">
            <span class="currency-name">{{ t.currency.name }}</span>
          </td>
          <td class="table-text has-text-centered">{{ t.currency.symbol }}</td>
          <td class="table-text has-text-right">{{ t.currency.marketCap | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.volume24h | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.percentChange1h | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.percentChange24h | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.percentChange7d | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.price | autoRound }}</td>
          <td class="table-text has-text-right">{{ t.expectedPrice | autoRound }}</td>
          <td class="table-text has-text-right">{{ t.expectedGrowth | round }} %</td>
        </tr>
      </tbody>
    </table>
    <spinner :show="loading"></spinner>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
import TrackedModal from '@/components/TrackedModal';
import UntrackConfirmationModal from '@/components/UntrackConfirmationModal';
import CurrencyIcon from '@/components/common/CurrencyIcon';
import Spinner from '@/components/common/Spinner';
import Tip from '@/components/common/Tip';

export default {
  name: 'Tracked',
  data() {
    return {
      loading: false,
      search: '',
      headers: [
        { text: '#', value: 'rank', align: 'centered' },
        { text: 'Icon', value: 'icon', align: 'centered' },
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Symbol', value: 'symbol', align: 'centered' },
        { text: 'Market Cap', value: 'marketCap', align: 'right' },
        { text: 'Volume (24h)', value: 'volume24h', align: 'right' },
        { text: '% 1h', value: 'percentChange1h', align: 'right' },
        { text: '% 24h', value: 'percentChange24h', align: 'right' },
        { text: '% 7d', value: 'percentChange7d', align: 'right' },
        { text: 'Current Price', value: 'price', align: 'right' },
        { text: 'Expected Price', value: 'expectedPrice', align: 'right' },
        { text: 'Expected Growth', value: 'expectedGrowth', align: 'right' },
      ],
      selected: { currency: {} },
      orderedBy: {},
      filterBy: '',
      orderedTracked: [],
      trackedModalOpen: false,
      untrackConfirmationModalOpen: false,
    };
  },
  watch: {
    filterBy() {
      this.filter();
    },
  },
  methods: {
    untrack() {
      this.$store.dispatch('untrack', { symbol: this.selected.currency.symbol })
        .then(() => {
          this.untrackConfirmationModalOpen = false;
          this.trackedModalOpen = false;
          this.loading = true;
          this.$store.dispatch('fetchTracked').then(() => {
            this.orderBy('expectedGrowth', 'desc');
            this.loading = false;
          });
        });
    },
    confirmUntrack() {
      this.trackedModalOpen = false;
      this.untrackConfirmationModalOpen = true;
    },
    cancelUntrack() {
      this.trackedModalOpen = true;
      this.untrackConfirmationModalOpen = false;
    },
    openModal(trackedCurrency) {
      this.selected = trackedCurrency;
      this.trackedModalOpen = true;
    },
    closeModal() {
      this.selected = { currency: {} };
      this.trackedModalOpen = false;
    },
    orderBy(field, order) {
      const textFields = ['name', 'symbol'];
      const trackedFields = ['expectedPrice', 'expectedGrowth'];
      if (field === this.orderedBy.field) {
        if (order) {
          this.orderedBy.order = order;
        } else {
          this.orderedBy.order = this.orderedBy.order === 'asc' ? 'desc' : 'asc';
        }
      } else {
        this.orderedBy = { field, order: order || 'asc' };
      }
      this.orderedTracked = _.orderBy(
        this.tracked,
        (obj) => {
          const target = trackedFields.includes(this.orderedBy.field) ? obj : obj.currency;
          const isText = textFields.includes(this.orderedBy.field);
          return isText ?
            target[this.orderedBy.field] : parseInt(target[this.orderedBy.field], 10);
        },
        this.orderedBy.order,
      );
    },
    filter() {
      this.orderedTracked = this.tracked.filter((t) => {
        if (this.filterBy === '') return true;
        const keys = Object.keys(t.currency);
        return keys.some(key =>
          (t[key] || '').toString().toLowerCase().includes(this.filterBy.toLowerCase()) ||
          (t.currency[key] || '').toString().toLowerCase().includes(this.filterBy.toLowerCase()));
      });
    },
    valuationUpdated(valuation) {
      this.orderBy(this.orderedBy.field, this.orderedBy.order);
      this.selected = valuation;
    },
  },
  computed: {
    tracked() {
      return this.$store.getters.tracked;
    },
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('fetchTracked').then(() => {
      this.orderBy('expectedGrowth', 'desc');
      this.loading = false;
    });
  },
  components: {
    UntrackConfirmationModal,
    TrackedModal,
    CurrencyIcon,
    Spinner,
    Tip,
  },
};
</script>

<style scoped>
.has-addons {
  margin-top: 40px;
  margin-bottom: 5px;
}
.search-bar {
  width: 300px;
}
</style>
