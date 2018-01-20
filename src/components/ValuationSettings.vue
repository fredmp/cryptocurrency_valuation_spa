<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs6>
        <v-card fixed centered tile>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Description"
                v-model="description"
                :rules="descriptionRules"
                required
              ></v-text-field>
              <v-select
                label="From"
                v-model="initialRange"
                :items="items"
                :rules="rangeRules"
                required
              ></v-select>
              <v-select
                label="To"
                v-model="finalRange"
                :items="items"
                :rules="rangeRules"
                required
              ></v-select>
              <v-text-field
                label="Weight"
                v-model="weight"
                :rules="weightRules"
                :counter="2"
                required
              ></v-text-field>

              <v-btn
                @click="add"
                :disabled="!valid"
              >
                add
              </v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="valuations"
            hide-actions
            item-key="name">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.description }}</td>
              <td class="text-xs-center">{{ props.item.from }}</td>
              <td class="text-xs-center">{{ props.item.to }}</td>
              <td class="text-xs-center">{{ props.item.weight }} %</td>
              <td class="text-xs-center">
                <v-icon @click.capture="remove(props.item.id)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    description: '',
    weight: '',
    initialRange: null,
    finalRange: null,
    items: [1, 2, 3, 4, 5],
    headers: [
      { text: 'Description', value: 'description', align: 'left' },
      { text: 'From', value: 'from', align: 'center' },
      { text: 'To', value: 'to', align: 'center' },
      { text: 'Weight', value: 'weight', align: 'center' },
      { text: 'Remove', value: 'remove', align: 'center' },
    ],
    descriptionRules: [
      v => !!v || 'Description is required',
    ],
    weightRules: [
      v => !!v || 'Weight is required',
      v => (v && v.length) <= 2 || 'Weight must be less than 2 characters',
    ],
    rangeRules: [
      v => !!v || 'Range is required',
    ],
  }),
  methods: {
    validateRange() {
      return !!this.initialRange && !!this.finalRange && this.initialRange < this.finalRange;
    },
    add() {
      if (this.validateRange() && this.$refs.form.validate()) {
        const valuation = {
          description: this.description,
          from: this.initialRange,
          to: this.finalRange,
          weight: this.weight,
        };
        this.$store.dispatch('addValuationSetting', valuation);
        this.clear();
      }
    },
    remove(valuationId) {
      this.$store.dispatch('removeValuationSetting', valuationId);
    },
    clear() {
      this.$refs.form.reset();
    },
  },
  computed: {
    valuations() {
      return this.$store.getters.valuationSettings;
    },
  },
  mounted() {
    this.$store.dispatch('fetchValuationSettings');
  },
};
</script>

<style scoped>
  i {
    cursor: pointer;
  }
</style>
