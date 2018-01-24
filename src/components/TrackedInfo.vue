<template>
  <div class="block">
    <div class="field is-horizontal">
      <div class="field-label is-normal rank-label">
        <label class="label">Rank</label>
      </div>
      <div class="field-body rank-input">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.currency.rank"
              readonly>
          </div>
        </div>
      </div>
      <div class="field-label is-normal price-label">
        <label class="label">Price</label>
      </div>
      <div class="field-body price-input">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.currency.price | money"
              readonly>
            <icon
              :name="`arrow-${priceStatus(selected.currency)}`"
              :class="`corner price-${priceStatus(selected.currency)}`">
            </icon>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Market Cap</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.currency.marketCap | money"
              readonly>
            <span
              class="corner corner-tip">{{ selected.currency.marketCap | moneyMagnitude }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Volume (24h)</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.currency.volume24h | money"
              readonly>
            <span
              class="corner corner-tip">{{ selected.currency.volume24h | moneyMagnitude }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal small-percentage-first">
        <label class="label">% 1h</label>
      </div>
      <div class="field-body small-percentage">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.currency.percentChange1h"
              readonly>
          </div>
        </div>
      </div>
      <div class="field-label is-normal small-percentage">
        <label class="label">% 24h</label>
      </div>
      <div class="field-body small-percentage">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.currency.percentChange24h"
              readonly>
          </div>
        </div>
      </div>
      <div class="field-label is-normal small-percentage">
        <label class="label">% 7d</label>
      </div>
      <div class="field-body small-percentage">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.currency.percentChange7d"
              readonly>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal inflationary-label">
        <label class="label">Inflationary?</label>
      </div>
      <div class="field-body inflationary-input">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.currency.inflationary ? 'Yes' : 'No'"
              readonly>
          </div>
        </div>
      </div>
      <div class="field-label is-normal liquidity-label">
        <label class="label">Liquidity</label>
      </div>
      <div class="field-body liquidity-input">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.currency.liquidity"
              readonly>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Max Price</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.currency.maxPrice | money"
              readonly>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Expected Price</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.expectedPrice | money"
              readonly>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal growth-label">
        <label class="label">Expected Growth</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input pointer has-text-centered"
              type="text"
              :value="selected.expectedGrowth + ' %'"
              readonly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrackedInfo',
  props: ['selected'],
  methods: {
    priceStatus(currency) {
      return currency.percentChange1h < 0 ? 'down' : 'up';
    },
  },
};
</script>

<style scoped>
.field-label > label {
  padding-top: 3px;
}
.rank-label {
  margin-left: 36px;
  margin-right: 20px;
}
.rank-input {
  max-width: 100px;
  margin-right: 0px;
  padding-right: 0px;
}
.price-label {
  margin-left: 0px;
  margin-right: 15px;
  padding-left: 15px;
  padding-right: 10px;
  max-width: 50px;
}
.price-input {
  max-width: 400px;
}
.liquidity-label {
  margin-left: 18px;
  margin-right: 10px;
}
.inflationary-label {
  margin-left: 6px;
}
.inflationary-input {
  max-width: 100px;
}
.growth-label {
  line-height: 1.2;
  vertical-align: middle;
  margin-top: 0;
  padding-top: 0;
}
.pointer {
  cursor: default;
}
.corner {
  position: absolute;
  top: 10px;
  right: 10px;
}
.corner-tip {
  font-size: 0.75em;
  color: darkgray;
}
.price-up {
  color: #00d1b2;
}
.price-down {
  color: #ff3860;
}
div .small-percentage {
  max-width: 100px;
}
div .field-label .small-percentage, div .field-label .small-percentage-first {
    max-width: 50px;
    padding-left: 0;
    padding-right: 0;
    margin-left: 2px;
    margin-right: 8px;
}
.small-percentage-first {
  margin-left: 30px;
}
</style>
