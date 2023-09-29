<template>
  <div>
    <!-- Модальное окно -->
    <AddCityModal v-if="showModal" />

    <h1>Список городов</h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Город</th>
          <th scope="col">Количество жителей</th>
          <th scope="col">Количество автомобилей</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(city, index) in cities" :key="index">
          <td>{{ city.name }}</td>
          <td>{{ city.population }}</td>
          <td>{{ city.cars }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="changeShowModal" class="btn btn-primary">
      Добавить город
    </button>
    <!-- Графики -->
    <CityCharts />
  </div>
</template>

<script>
import AddCityModal from "./components/AddCityModal.vue";
import CityCharts from "./components/CityCharts.vue";

export default {
  components: {
    AddCityModal,
    CityCharts,
  },

  computed: {
    cities() {
      return this.$store.state.cities;
    },
    showModal() {
      return this.$store.state.showModal;
    },
  },

  methods: {
    changeShowModal() {
      this.$store.commit("changeShowModal");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
