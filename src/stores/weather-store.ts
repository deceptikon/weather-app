import { defineStore } from 'pinia';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    city: {},
    lastCities: [],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    setCity(c: object) {
      console.error(
        JSON.stringify(c),
        JSON.stringify(this.city),
        JSON.stringify(this.lastCities)
      );
      if (Object.keys(this.city).length) {
        this.saveLastUsed(this.city);
      }
      this.city = c;
    },
    saveLastUsed(c: object) {
      this.lastCities.push(c);
    },
  },
});
