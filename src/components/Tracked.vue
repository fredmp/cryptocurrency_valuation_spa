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
  <div class="block">
    <div :class="{ 'modal': true, 'is-active': modal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <img :src="icon" :alt="selected.currency.name">
            <span>{{ selected.currency.symbol }} - {{ selected.currency.name }}</span>
          </p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="tabs is-centered">
            <ul>
              <li :class="{ 'is-active': currentComponent === 'tracked-info' }">
                <a @click="currentComponent = 'tracked-info'">
                  Info
                </a>
              </li>
              <li :class="{ 'is-active': currentComponent === 'tracked-valuations' }">
                <a @click="currentComponent = 'tracked-valuations'">
                  Valuations
                </a>
              </li>
              <li :class="{ 'is-active': currentComponent === 'tracked-notes' }">
                <a @click="currentComponent = 'tracked-notes'">
                  Notes
                </a>
              </li>
            </ul>
          </div>
          <component
            :is="currentComponent"
            :selected="selected"
            @valuationUpdated="valuationUpdated"
            class="main-content">
          </component>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="closeModal">Close</button>
        </footer>
      </div>
    </div>
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
          <td class="table-text has-text-left">{{ t.currency.name }}</td>
          <td class="table-text has-text-centered">{{ t.currency.symbol }}</td>
          <td class="table-text has-text-right">{{ t.currency.marketCap | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.volume24h | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.percentChange1h | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.percentChange24h | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.percentChange7d | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.price | round }}</td>
          <td class="table-text has-text-right">{{ t.expectedPrice | round }}</td>
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
import Spinner from '@/components/utils/Spinner';
import TrackedInfo from '@/components/TrackedInfo';
import TrackedNotes from '@/components/TrackedNotes';
import TrackedValuations from '@/components/TrackedValuations';

export default {
  name: 'Tracked',
  data() {
    return {
      loading: false,
      modal: false,
      icon: '',
      search: '',
      headers: [
        { text: '#', value: 'rank', align: 'centered' },
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
      currentComponent: 'tracked-info',
    };
  },
  watch: {
    filterBy() {
      this.filter();
    },
  },
  methods: {
    openModal(trackedCurrency) {
      this.currentComponent = 'tracked-info';
      this.selected = trackedCurrency;
      this.icon = this.currencyIcon();
      this.modal = true;
    },
    closeModal() {
      this.selected = { currency: {} };
      this.modal = false;
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
    currencyIcon() {
      let src = '';
      try {
        src = this.selected.currency.name.replace(/\s/g, '-').toLowerCase();
        return `https://files.coinmarketcap.com/static/img/coins/32x32/${src}.png`;
      } catch (e) {
        return '';
      }
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
    Spinner,
    TrackedInfo,
    TrackedNotes,
    TrackedValuations,
  },
};
</script>

<style scoped>
.has-addons {
  margin-top: 40px;
  margin-bottom: 25px;
}
.search-bar {
  width: 300px;
}
.modal-card-title {
  padding: 4px;
}
.modal-card-title > img {
  vertical-align: middle;
}
.modal-card-title > span {
  vertical-align: middle;
  margin-left: 10px;
}
.main-content {
  min-height: 424px;
}
</style>
