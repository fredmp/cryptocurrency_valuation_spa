<template>
  <v-container fluid>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="currencies"
      :search="search"
      hide-actions
      item-key="name"
      class="elevation-10"
      dark
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-center">{{ props.item.rank }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.symbol }}</td>
          <td class="text-xs-right">{{ props.item.marketCap | round }}</td>
          <td class="text-xs-right">{{ props.item.price | round }}</td>
          <td class="text-xs-right">{{ props.item.volume24h | round }}</td>
          <td class="text-xs-right">{{ props.item.percentChange1h | round }}</td>
          <td class="text-xs-right">{{ props.item.percentChange24h | round }}</td>
          <td class="text-xs-right">{{ props.item.percentChange7d | round }}</td>
          <td class="text-xs-center">{{ props.item.liquidity }}</td>
          <td class="text-xs-center">{{ props.item.inflationary | humanizeBoolean }}</td>
          <td class="text-xs-right">{{ props.item.maxPrice | round }}</td>
          <td class="text-xs-right">{{ props.item.fairPrice | round }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card height="200px" flat>
          <v-card-text>Other coin attributes, subjective valuation and comments</v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </v-card>
</v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: '#', value: 'rank', align: 'center' },
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Symbol', value: 'symbol', align: 'center' },
          { text: 'Market Cap', value: 'marketCap', align: 'right' },
          { text: 'Price', value: 'price', align: 'right' },
          { text: 'Volume (24h)', value: 'volume24h', align: 'right' },
          { text: '% 1h', value: 'percentChange1h', align: 'right' },
          { text: '% 24h', value: 'percentChange24h', align: 'right' },
          { text: '% 7d', value: 'percentChange7d', align: 'right' },
          { text: 'Liquidity', value: 'liquidity', align: 'center' },
          { text: 'Inflationary', value: 'inflationary', align: 'center' },
          { text: 'Max Price', value: 'maxPrice', align: 'right' },
          { text: 'Fair Price', value: 'fairPrice', align: 'right' }
        ]
      }
    },
    computed: {
      currencies () {
        return this.$store.getters.currencies
      }
    },
    mounted () {
      this.$store.dispatch('fetchCurrencies')
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
