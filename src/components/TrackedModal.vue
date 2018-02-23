<template>
<div :class="{ 'modal': true, 'is-active': visible}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        <currency-icon :symbol="tracked.currency.symbol" size="64"/>
        <span>{{ tracked.currency.symbol }} - {{ tracked.currency.name }}</span>
      </p>
      <button class="delete" aria-label="close" @click="onClose"></button>
    </header>
    <section class="modal-card-body">
      <div class="tabs is-centered">
        <ul>
          <li :class="{ 'is-active': tab === 'tracked-info' }">
            <a @click="tab = 'tracked-info'">
              Info
            </a>
          </li>
          <li :class="{ 'is-active': tab === 'tracked-valuations' }">
            <a @click="tab = 'tracked-valuations'">
              Valuations
            </a>
          </li>
          <li :class="{ 'is-active': tab === 'tracked-notes' }">
            <a @click="tab = 'tracked-notes'">
              Notes
            </a>
          </li>
        </ul>
      </div>
      <component
        :is="tab"
        :selected="tracked"
        @valuationUpdated="valuationUpdated"
        class="main-content">
      </component>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-info" @click="onUntrack">Untrack</button>
      <button class="button" @click="onClose">Close</button>
    </footer>
  </div>
</div>
</template>

<script>
import TrackedInfo from '@/components/TrackedInfo';
import TrackedNotes from '@/components/TrackedNotes';
import TrackedValuations from '@/components/TrackedValuations';
import CurrencyIcon from '@/components/common/CurrencyIcon';

export default {
  name: 'TrackedModal',
  props: ['tracked', 'visible'],
  data() {
    return {
      tab: 'tracked-info',
    };
  },
  mounted() {
    this.tab = 'tracked-info';
  },
  methods: {
    onUntrack() {
      this.$emit('confirm');
    },
    onClose() {
      this.$emit('close');
    },
    valuationUpdated(valuation) {
      this.$emit('valuationUpdated', valuation);
    },
  },
  computed: {
    trackedCurrency() {
      return this.tracked || { currency: {} };
    },
  },
  components: {
    TrackedInfo,
    TrackedNotes,
    TrackedValuations,
    CurrencyIcon,
  },
};
</script>

<style scoped>
.modal-card-title {
  padding: 4px;
  align-items: center;
  display: flex;
}
.modal-card-title > img {
  vertical-align: middle;
}
.modal-card-title > span {
  vertical-align: middle;
  margin-left: 20px;
}
.main-content {
  min-height: 424px;
}
</style>
