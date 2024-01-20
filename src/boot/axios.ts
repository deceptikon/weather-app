import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const apiCities = axios.create({
  // baseURL: 'http://geodb-free-service.wirefreethought.com/v1/geo/places',
  baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  headers: {
    'X-RapidAPI-Key': '0a1decce60msh71dc856f38b59a8p1c54b6jsn56ab8d0a22c4',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
});
const apiMeteo = axios.create({
  baseURL: 'https://api.open-meteo.com/v1/forecast',
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$apiCities = apiCities;
  app.config.globalProperties.$apiMeteo = apiMeteo;
});

export { apiCities, apiMeteo };
