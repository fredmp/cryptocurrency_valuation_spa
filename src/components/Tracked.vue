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
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <th v-for="h in headers" :key="h.value">
          <td :id="h.value" :class="'table-header table-text has-text-' + h.align">
            <a @click="orderBy(h.value)">{{ h.text }}</a>
          </td>
        </th>
      </thead>
      <tbody>
        <tr v-for="t in orderedTracked" :key="t.id">
          <td class="table-text has-text-centered">{{ t.currency.rank }}</td>
          <td class="table-text has-text-left">{{ t.currency.name }}</td>
          <td class="table-text has-text-centered">{{ t.currency.symbol }}</td>
          <td class="table-text has-text-right">{{ t.currency.marketCap | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.price | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.volume24h | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.percentChange1h | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.percentChange24h | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.percentChange7d | round }}</td>
          <td class="table-text has-text-right">Valuation</td>
          <td class="table-text has-text-right">{{ t.currency.fairPrice | round }}</td>
          <td class="table-text has-text-right">{{ t.currency.growthPotential | round }} %</td>
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

export default {
  name: 'Tracked',
  data() {
    return {
      loading: false,
      search: '',
      headers: [
        { text: '#', value: 'rank', align: 'centered' },
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Symbol', value: 'symbol', align: 'centered' },
        { text: 'Market Cap', value: 'marketCap', align: 'right' },
        { text: 'Price', value: 'price', align: 'right' },
        { text: 'Volume (24h)', value: 'volume24h', align: 'right' },
        { text: '% 1h', value: 'percentChange1h', align: 'right' },
        { text: '% 24h', value: 'percentChange24h', align: 'right' },
        { text: '% 7d', value: 'percentChange7d', align: 'right' },
        { text: 'Valuation', value: 'valuation', align: 'centered' },
        { text: 'Fair Price', value: 'fairPrice', align: 'centered' },
        { text: 'Growth Potential', value: 'growthPotential', align: 'centered' },
      ],
      selected: {},
      orderedBy: {},
      filterBy: '',
      orderedTracked: [],
    };
  },
  watch: {
    filterBy() {
      this.filter();
    },
  },
  methods: {
    orderBy(field) {
      const textFields = ['name', 'symbol'];
      // const directFields = ['valuation'];
      if (field === this.orderedBy.field) {
        this.orderedBy.order = this.orderedBy.order === 'asc' ? 'desc' : 'asc';
      } else {
        this.orderedBy = { field, order: 'asc' };
      }
      this.orderedTracked = _.orderBy(
        this.tracked,
        (obj) => {
          const isText = textFields.includes(obj[this.orderedBy.field]);
          return isText ?
            obj.currency[this.orderedBy.field] : parseInt(obj.currency[this.orderedBy.field], 10);
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
  },
  computed: {
    tracked() {
      return this.$store.getters.tracked;
    },
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('fetchTracked', { currencyInfo: true }).then(() => {
      this.orderBy('rank');
      this.loading = false;
    });
  },
  components: {
    Spinner,
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
</style>
