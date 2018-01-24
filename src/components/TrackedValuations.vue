<template>
  <div class="block">
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <th class="table-header table-text has-text-left"><td>Name</td></th>
        <th class="table-header table-text has-text-left"><td>Description</td></th>
        <th class="table-header table-text has-text-centered"><td>Weight</td></th>
        <th class="table-header table-text has-text-centered"><td>Value</td></th>
      </thead>
      <tbody>
        <tr v-for="v in selected.valuations" :key="v.id">
          <td class="table-text has-text-left">{{ v.valuationSetting.name }}</td>
          <td class="table-text has-text-left">{{ v.valuationSetting.description }}</td>
          <td class="table-text has-text-centered">{{ v.valuationSetting.weight }}</td>
          <td class="table-text has-text-centered">
            <spinner :show="loading === v.id"></spinner>
            <div class="select" v-if="loading !== v.id">
              <select
                :value="v.value"
                v-on:change="update(v, $event)">
                <option v-for="i in v.valuationSetting.maxValue" :key="i" :value="i">
                  {{ i }}
                </option>
              </select>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Spinner from '@/components/utils/Spinner';

export default {
  name: 'TrackedValuations',
  props: ['selected'],
  data() {
    return {
      loading: null,
    };
  },
  methods: {
    update(valuation, event) {
      this.loading = valuation.id;
      this.$store.dispatch(
        'updateValuation',
        { trackedCurrency: this.selected, valuation, value: event.target.value },
      ).then(() => {
        this.loading = null;
      }).catch((error) => {
        // Show feedback
        // Show old value in select
        this.loading = null;
        console.log(error);
      });
    },
  },
  components: {
    Spinner,
  },
};
</script>

<style>
tr > td, div .select {
  vertical-align: middle;
}
.spinner, .spinner img {
  max-width: 15px;
  max-height: 15px;
  margin: 2px auto 0 auto !important;
  padding: 0px !important;
}
</style>
