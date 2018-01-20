<template>
  <div class="block">
    <nav class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <div class="field has-addons">
          <p class="control">
            <input type="text" class="input" placeholder="Enter keywords...">
          </p>
          <p class="control">
            <a href="" class="button is-info">Search</a>
          </p>
        </div>
      </div>
    </nav>
    <div class="block">
      <table class="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <th v-for="h in headers" :key="h.value">
              <td :id="h.value" :class="'has-text-' + h.align">{{ h.text }}</td>
            </th>
          </thead>
          <tbody>
            <tr v-for="c in currencies" :key="c.name">
              <td class="has-text-centered">{{ c.rank }}</td>
              <td class="has-text-left">{{ c.name }}</td>
              <td class="has-text-centered">{{ c.symbol }}</td>
              <td class="has-text-right">{{ c.marketCap | round }}</td>
              <td class="has-text-right">{{ c.price | round }}</td>
              <td class="has-text-right">{{ c.volume24h | round }}</td>
              <td class="has-text-right">{{ c.percentChange1h | round }}</td>
              <td class="has-text-right">{{ c.percentChange24h | round }}</td>
              <td class="has-text-right">{{ c.percentChange7d | round }}</td>
              <td class="has-text-centered">{{ c.liquidity }}</td>
              <td class="has-text-centered">{{ c.inflationary | humanizeBoolean }}</td>
              <td class="has-text-right">{{ c.maxPrice | round }}</td>
              <td class="has-text-right">{{ c.fairPrice | round }}</td>
              <td class="has-text-right">{{ c.growthPotential | round }} %</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<script>
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
        { text: 'Max Price', value: 'maxPrice', align: 'right' },
        { text: 'Fair Price', value: 'fairPrice', align: 'right' },
        { text: 'Growth Potential', value: 'growthPotential', align: 'right' },
      ],
    };
  },
  computed: {
    currencies() {
      return this.$store.getters.currencies;
    },
  },
  mounted() {
    this.$store.dispatch('fetchCurrencies');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .has-addons {
    margin-top: 40px;
    margin-bottom: 25px;
  }
</style>
