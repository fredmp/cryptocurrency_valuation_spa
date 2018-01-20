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
              <a class="button is-info" @click="filter()">Search</a>
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
            <tr v-for="c in orderedCurrencies" :key="c.name">
              <td class="table-text has-text-centered">{{ c.rank }}</td>
              <td class="table-text has-text-left">{{ c.name }}</td>
              <td class="table-text has-text-centered">{{ c.symbol }}</td>
              <td class="table-text has-text-right">{{ c.marketCap | round }}</td>
              <td class="table-text has-text-right">{{ c.price | round }}</td>
              <td class="table-text has-text-right">{{ c.volume24h | round }}</td>
              <td class="table-text has-text-right">{{ c.percentChange1h | round }}</td>
              <td class="table-text has-text-right">{{ c.percentChange24h | round }}</td>
              <td class="table-text has-text-right">{{ c.percentChange7d | round }}</td>
              <td class="table-text has-text-centered">{{ c.liquidity }}</td>
              <td class="table-text has-text-centered">{{ c.inflationary | humanizeBoolean }}</td>
              <td class="table-text has-text-right">{{ c.maxPrice | round }}</td>
              <td class="table-text has-text-right">{{ c.fairPrice | round }}</td>
              <td class="table-text has-text-right">{{ c.growthPotential | round }} %</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
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
        { text: 'Liquidity', value: 'liquidity', align: 'centered' },
        { text: 'Inflationary', value: 'inflationary', align: 'centered' },
        { text: 'Max Price', value: 'maxPrice', align: 'centered' },
        { text: 'Fair Price', value: 'fairPrice', align: 'centered' },
        { text: 'Growth Potential', value: 'growthPotential', align: 'centered' },
      ],
      orderedCurrencies: [],
      orderedBy: {},
      filterBy: '',
    };
  },
  watch: {
    filterBy() {
      this.filter();
    },
  },
  methods: {
    orderBy(field) {
      const textFields = ['name', 'symbol', 'inflationary'];
      if (field === this.orderedBy.field) {
        this.orderedBy.order = this.orderedBy.order === 'asc' ? 'desc' : 'asc';
      } else {
        this.orderedBy = { field, order: 'asc' };
      }
      this.orderedCurrencies = _.orderBy(
        this.currencies,
        (obj) => {
          const isText = textFields.includes(obj[this.orderedBy.field]);
          return isText ? obj[this.orderedBy.field] : parseInt(obj[this.orderedBy.field], 10);
        },
        this.orderedBy.order,
      );
    },
    filter() {
      this.orderedCurrencies = this.currencies.filter((currency) => {
        if (this.filterBy === '') return true;
        const keys = Object.keys(currency);
        return keys.some(key => (currency[key] || '').toString().toLowerCase().includes(this.filterBy.toLowerCase()));
      });
    },
  },
  computed: {
    currencies() {
      return this.$store.getters.currencies;
    },
  },
  mounted() {
    this.$store.dispatch('fetchCurrencies').then(() => {
      this.orderBy('rank');
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .has-addons {
    margin-top: 40px;
    margin-bottom: 25px;
  }
  .search-bar {
    width: 300px;
  }
</style>
