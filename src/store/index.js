import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    cities: [],
    showModal: false,
  },
  mutations: {
    setCities(state, cities) {
      state.cities = cities;
    },
    changeShowModal(state) {
      state.showModal = !state.showModal;
    },
    addCity(state, newCity) {
      state.cities.push(newCity);
    },
  },
  actions: {
    async fetchCities({ commit }) {
      try {
        const response = await axios.get("./data.json");
        const cities = response.data.cities;
        commit("setCities", cities);
      } catch (error) {
        console.error("Ошибка при загрузке данных о городах:", error);
      }
    },
  },
  getters: {},
});
