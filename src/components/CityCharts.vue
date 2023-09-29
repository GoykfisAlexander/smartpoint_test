<template>
  <div class="d-flex">
    <!-- Круговая диаграмма по городам и жителям -->
    <canvas :id="pieChartId" class="chart"></canvas>
    <!-- Столбчатая диаграмма по соотношению автомобили/жители для каждого города -->
    <canvas :id="barChartId" class="chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      pieChart: null,
      barChart: null,
      pieChartId: "pieChart" + Math.random().toString(36).substring(7),
      barChartId: "barChart" + Math.random().toString(36).substring(7),
    };
  },
  computed: {
    cities() {
      return this.$store.state.cities;
    },
    showModal() {
      return this.$store.state.showModal;
    },
  },
  watch: {
    showModal: {
      handler() {
        this.$nextTick(() => {
          this.renderPieChart();
          this.renderBarChart();
        });
      },
      immediate: true,
    },
  },
  mounted() {
    this.$store.dispatch("fetchCities").then(() => {
      this.renderPieChart();
      this.renderBarChart();
    });
  },
  methods: {
    renderPieChart() {
      const ctx = document.getElementById(this.pieChartId);
      this.destroyChart(this.pieChart);
      if (ctx) {
        const data = {
          labels: this.cities.map((city) => city.name),
          datasets: [
            {
              data: this.cities.map((city) => city.population),
              backgroundColor: [
                "red",
                "blue",
                "green",
                "orange",
                "purple",
                "pink",
                "brown",
                "yellow",
              ],
            },
          ],
        };
        this.pieChart = new Chart(ctx, {
          type: "pie",
          data,
        });
      }
    },
    renderBarChart() {
      const ctx = document.getElementById(this.barChartId);
      this.destroyChart(this.barChart);
      if (ctx) {
        const data = {
          labels: this.cities.map((city) => city.name),
          datasets: [
            {
              label: "Соотношение автомобили/жители",
              data: this.cities.map((city) => city.cars / city.population),
              backgroundColor: "blue",
            },
          ],
        };
        this.barChart = new Chart(ctx, {
          type: "bar",
          data,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    },
    destroyChart(chart) {
      if (chart) {
        chart.destroy();
      }
    },
  },
};
</script>

<style>
.chart {
  max-width: 50vw;
  max-height: 400px;
}
</style>
