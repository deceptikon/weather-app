import { defineStore } from 'pinia';
import { City } from 'src/components/models';

interface State {
  city: City | null;
  lastCities: Array<City>;
}

export const useWeatherStore = defineStore('weather', {
  state: (): State => ({
    city: null,
    lastCities: [],
  }),
  getters: {},
  actions: {
    setCity(c: City) {
      if (this.city) {
        this.saveLastUsed(c, this.city);
      }
      this.city = c;
    },
    saveLastUsed(city: City, existingCity: City) {
      const index = this.lastCities.findIndex((c) => city.id === c.id);
      if (index > -1) {
        this.lastCities.splice(index, 1);
      }
      this.lastCities.push(existingCity);
    },
  },
});
