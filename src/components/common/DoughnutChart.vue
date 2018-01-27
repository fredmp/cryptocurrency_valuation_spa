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
      }, { responsive: true, maintainAspectRatio: true, events: ['click'] });
    },
  },

  mounted() {
    this.update();
  },
};
</script>

<style scoped>
canvas {
  margin: auto !important;
  padding-top: 20px;
}
</style>
