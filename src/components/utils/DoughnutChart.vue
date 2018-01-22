<script>
import { Doughnut } from 'vue-chartjs';

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  props: ['label', 'elements'],

  watch: {
    elements() {
      this.update();
    },
  },

  methods: {
    update() {
      this.renderChart({
        labels: this.elements.map(e => e.label),
        datasets: [
          {
            label: this.label,
            backgroundColor: this.elements.map(e => e.color),
            data: this.elements.map(e => e.data),
          },
        ],
      });
    },
  },

  mounted() {
    this.update();
  },
};
</script>
