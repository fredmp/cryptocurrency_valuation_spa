<template>
<div :class="{ 'modal': true, 'is-active': active }">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Choose the valuation settings you'd like to use</p>
      <button class="delete" aria-label="close" @click="close"></button>
    </header>
    <section class="modal-card-body">
      <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th v-for="header in headers" :key="header.value">
            <td
              :id="header.value"
              :class="'table-header table-text has-text-' + header.align">
              {{ header.text }}
            </td>
          </th>
        </thead>
        <tbody>
          <tr v-for="preset in presets" :key="preset.name + '-preset'">
            <td :key="preset.name + '-name'" class="table-text has-text-left">
              {{ preset.name }}</td>
            <td :key="preset.name + '-description'" class="table-text has-text-left">
              {{ preset.description }}</td>
            <td :key="preset.name + '-maxValue'" class="table-text has-text-centered">
              {{ preset.maxValue }}</td>
            <td :key="preset.name + '-weight'" class="table-text has-text-centered">
              {{ preset.weight }} %</td>
            <td :key="preset.name + '-add'" class="table-text has-text-centered is-short">
              <a @click.capture="addOne(preset)" class="is-info">
                <icon name="plus" label="Plus"></icon>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="modal-card-foot">
      <button
        key="addAllPresets"
        @click="addAll"
        class="button is-info">
        Add all
      </button>
      <button key="closePresetsModal" class="button" @click="close">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
export default {
  name: 'PresetValuationSettingModal',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    headers: [
      { text: 'Name', value: 'preset-name', align: 'left' },
      { text: 'Description', value: 'preset-description', align: 'left' },
      { text: 'Max Value', value: 'preset-maxValue', align: 'centered' },
      { text: 'Weight', value: 'preset-weight', align: 'centered' },
      { text: 'Add', value: 'preset-add', align: 'centered' },
    ],
  }),
  methods: {
    addAll() {
      const weights = this.weightsToAddAllPresets();
      const valuationSettings = this.presets.map(({ name, description, maxValue }, index) => ({
        name, description, maxValue, weight: weights[index],
      }));
      this.$store.dispatch('addValuationSettings', valuationSettings)
        .then(() => this.$store.dispatch('fetchValuationSettings'))
        .then(() => {
          if (this.presets.length < 1) this.$emit('close');
        });
    },
    addOne({ name, description, maxValue, weight }) {
      const preset = {
        name,
        description,
        maxValue,
        weight: weight <= this.remainingWeight ? weight : 0,
      };
      this.$store.dispatch('addValuationSetting', preset)
        .then(() => this.$store.dispatch('fetchValuationSettings'))
        .then(() => {
          if (this.presets.length < 1) this.$emit('close');
        });
    },
    weightsToAddAllPresets() {
      const weights = [];
      let remaining = this.remainingWeight;
      if (this.remainingWeight === 100) return this.presets.map(p => p.weight);
      this.presets.forEach((p) => {
        const weight = p.weight <= remaining ? p.weight : remaining;
        remaining -= weight;
        weights.push(weight);
      });
      return weights;
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    valuations() {
      return this.$store.getters.valuationSettings;
    },
    presets() {
      return this.$store.getters.remainingPresets;
    },
    remainingWeight() {
      return this.$store.getters.remainingValuationWeight;
    },
  },
};
</script>

<style scoped>
</style>
