<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    item-key="name"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ props.item.rank }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.symbol }}</td>
        <td class="text-xs-right">{{ props.item.marketCap }}</td>
        <td class="text-xs-right">{{ props.item.currentPrice }}</td>
        <td class="text-xs-right">{{ props.item.volume24h }}</td>
        <td class="text-xs-right">{{ props.item.percentChange1h }}</td>
        <td class="text-xs-right">{{ props.item.percentChange24h }}</td>
        <td class="text-xs-right">{{ props.item.percentChange7d }}</td>
        <td class="text-xs-right">{{ props.item.maxPrice }}</td>
        <td class="text-xs-right">{{ props.item.fairPrice }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>Other coin attributes, subjective valuation and comments</v-card-text>
      </v-card>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: '#', value: 'rank' },
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Symbol', value: 'symbol' },
          { text: 'Market Cap', value: 'marketCap' },
          { text: 'Price', value: 'currentPrice' },
          { text: 'Volume (24h)', value: 'volume24h' },
          { text: '% 1h', value: 'percentChange1h' },
          { text: '% 24h', value: 'percentChange24h' },
          { text: '% 7d', value: 'percentChange7d' },
          { text: 'Max Price', value: 'maxPrice' },
          { text: 'Fair Price', value: 'fairPrice' }
        ],
        items: [
          {
            value: false,
            rank: 1,
            name: 'Bitcoin',
            symbol: 'BTC',
            marketCap: 261546262560,
            currentPrice: 15609.6,
            volume24h: 16977900000.0,
            percentChange1h: 0.88,
            percentChange24h: -7.29,
            percentChange7d: -6.28,
            maxPrice: 15609.6,
            fairPrice: 15609.6
          },
          {
            value: false,
            rank: 2,
            name: 'Ethereum',
            symbol: 'ETH',
            marketCap: 546262560,
            currentPrice: 609.6,
            volume24h: 9900000.0,
            percentChange1h: 0.9,
            percentChange24h: -2.29,
            percentChange7d: -4.28,
            maxPrice: 5609.6,
            fairPrice: 4609.6
          },
          {
            value: false,
            rank: 3,
            name: 'Litecoin',
            symbol: 'LTC',
            marketCap: 446262560,
            currentPrice: 320.6,
            volume24h: 8800000.0,
            percentChange1h: 0.80,
            percentChange24h: -6.29,
            percentChange7d: -0.28,
            maxPrice: 4888.6,
            fairPrice: 4000.6
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
