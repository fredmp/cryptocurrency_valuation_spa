<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-32x32">
            <img :src="icon()">
          </figure>
        </div>
        <div class="media-content">
          <p class="title currency-title">{{ currency.name }}</p>
        </div>
        <div class="media-right">
          <p :class="'title currency-growth price-' + priceStatus()">
            {{ currency.percentChange1h }}%
          </p>
          <p :class="'title currency-price'">
            $ {{ currency.price | autoRound }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyIcon } from '@/utils/mixins';

export default {
  name: 'CurrencyCard',
  props: ['currency'],
  methods: {
    priceStatus() {
      return this.currency.percentChange1h < 0 ? 'down' : 'up';
    },
    icon() {
      return currencyIcon(this.currency, { type: 'svg' });
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 1.4em;
}
.card {
  height: 92px;
  margin-bottom: 1rem;
}
.card-content {
  padding: 1rem;
}
.card-footer {
  border-top-style: none;
}
.price-up {
  color: hsl(141, 71%, 48%);
}
.price-down {
  color: hsl(348, 100%, 61%);
}
.currency-title, .currency-growth {
  padding-top: 4px;
}
.currency-price, .currency-growth {
  text-align: right !important;
}
.currency-growth {
  margin-bottom: 10px !important;
}
</style>
