<template>
  <div>
    <!-- Модальное окно -->
    <div
      class="modal"
      :class="{ show: showModal }"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Добавить город</h5>
            <button
              type="button"
              class="btn btn-primary"
              @click="changeShowModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Форма для ввода данных -->
            <form @submit="addCity">
              <!-- Поля для ввода данных о новом городе -->
              <div class="form-group">
                <label for="cityName">Город:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newCity.name"
                  id="cityName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="population">Количество жителей:</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="newCity.population"
                  id="population"
                  required
                />
              </div>
              <div class="form-group">
                <label for="cars">Количество автомобилей:</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="newCity.cars"
                  id="cars"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Сохранить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    renderPieChart: Function,
    renderBarChart: Function,
  },
  data() {
    return {
      newCity: {
        name: "",
        population: 0,
        cars: 0,
      },
    };
  },
  methods: {
    addCity(event) {
      event.preventDefault();
      this.$store.commit("addCity", this.newCity);
      this.changeShowModal();
    },

    changeShowModal() {
      this.$store.commit("changeShowModal");
    },
  },
};
</script>
