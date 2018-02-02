<template>
  <div class="block">
    <div class="block">
      <nav class="level">
        <div class="level-left">
          <article class="message is-warning" v-show="valuations.length === 0 && !hideNotification">
            <div class="message-header">
              <p>Suggestion: Add Valuation Settings</p>
              <button class="delete" aria-label="delete" @click="hideNotification = true"></button>
            </div>
            <div class="message-body">
              <a @click="$router.push('settings')">
                It seems you don't have any valuation settings. You can click here to add it now!
              </a>
            </div>
          </article>
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
    <div class="block">
      <div :class="{ 'modal': true, 'is-active': modal}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">
              {{ trackedCurrencyIds.includes(selected.id) ? 'Untrack': 'Track' }}
              {{ selected.symbol }}
            </p>
            <button class="delete" aria-label="close" @click="closeModal"></button>
          </header>
          <section class="modal-card-body">
            Do you want to
            {{ trackedCurrencyIds.includes(selected.id) ? 'untrack': 'track' }}
            {{ selected.name }}?
            <div class="notification is-danger" v-show="trackErrorMessage.length > 0">
              <button class="delete" @click="trackErrorMessage = ''"></button>
              {{ trackErrorMessage }}
            </div>
          </section>
          <footer class="modal-card-foot">
            <button
              @click="track()"
              class="button is-info">
              Confirm
            </button>
            <button class="button" @click="closeModal">Cancel</button>
          </footer>
        </div>
      </div>
      <div class="tip">
        <p>
          <icon name="info-circle" label="Info"></icon>
          <span>&nbsp;You can click on a coin to start monitoring it</span>
        </p>
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
          <tr
            v-for="c in orderedCurrencies"
            @click="openModal(c)"
            :key="c.name"
            :class="{ 'tracked': trackedCurrencyIds.includes(c.id) }">
            <td class="table-text has-text-centered">{{ c.rank }}</td>
            <td class="table-text has-text-left">{{ c.name }}</td>
            <td class="table-text has-text-centered">{{ c.symbol }}</td>
            <td class="table-text has-text-right">{{ c.marketCap | round }}</td>
            <td class="table-text has-text-right">{{ c.price | autoRound }}</td>
            <td class="table-text has-text-right">{{ c.volume24h | round }}</td>
            <td class="table-text has-text-right">{{ c.percentChange1h | round }}</td>
            <td class="table-text has-text-right">{{ c.percentChange24h | round }}</td>
            <td class="table-text has-text-right">{{ c.percentChange7d | round }}</td>
            <td class="table-text has-text-centered">{{ c.liquidity }}</td>
            <td class="table-text has-text-centered">{{ c.inflationary | humanizeBoolean }}</td>
            <td class="table-text has-text-right">{{ c.maxPrice | autoRound }}</td>
            <td class="table-text has-text-right">{{ c.growthPotential | round }} %</td>
          </tr>
        </tbody>
      </table>
      <spinner :show="loading"></spinner>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Spinner from '@/components/common/Spinner';

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
        { text: 'Growth Potential', value: 'growthPotential', align: 'centered' },
      ],
      orderedCurrencies: [],
      selected: {},
      orderedBy: {},
      filterBy: '',
      loading: false,
      modal: false,
      trackErrorMessage: '',
      hideNotification: true,
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
          const isText = textFields.includes(this.orderedBy.field);
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
    track() {
      if (this.selected) {
        const action = this.trackedCurrencyIds.includes(this.selected.id) ? 'untrack' : 'track';
        this.$store.dispatch(action, { symbol: this.selected.symbol })
          .then(() => this.$store.dispatch('fetchTrackedCurrencyIds'))
          .then(() => {
            this.selected = {};
            this.modal = false;
            this.$store.dispatch('hightLightTrackedCoinsMenu');
          })
          .catch((error) => {
            this.trackErrorMessage = error.message;
          });
      }
    },
    openModal(currency) {
      this.selected = currency;
      this.modal = true;
    },
    closeModal() {
      this.selected = {};
      this.modal = false;
      this.trackErrorMessage = '';
    },
  },
  computed: {
    currencies() {
      return this.$store.getters.currencies;
    },
    trackedCurrencyIds() {
      return this.$store.getters.trackedCurrencyIds;
    },
    valuations() {
      return this.$store.getters.valuationSettings;
    },
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('fetchCurrencies').then(() => {
      this.orderBy('rank');
      this.loading = false;
      this.$store.dispatch('fetchTrackedCurrencyIds');
    });
  },
  created() {
    this.$store.dispatch('fetchValuationSettings').then(() => {
      if (this.valuations.length === 0) this.hideNotification = false;
    });
  },
  components: {
    Spinner,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.has-addons, article.message {
  margin-top: 40px;
  margin-bottom: 5px;
}
.search-bar {
  width: 300px;
}
.notification {
  padding: 8px;
  margin: 15px 0 0 0;
}
tr.tracked {
  border-left-color: lighten(#3273dc, 20%);
  border-left-width: 2px;
  border-left-style: solid;
}
.tip {
  padding-bottom: 10px;
  float: right;
}
.tip > p {
  margin: auto;
  padding-right: 2px;
  font-size: 0.8em;
  color: darkgrey;
}
.tip > p > span {
  vertical-align: middle;
}
.tip > p > svg {
  padding: 0px;
  margin: 0px;
  display: inline;
  vertical-align: middle;
  color: darkgrey;
}
article > .message-body, article > .message-header {
  color: rgb(120, 120, 120) !important;
}
article > .message-body > a {
  text-decoration: none !important;
}
</style>
