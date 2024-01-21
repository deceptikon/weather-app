<template>
  <q-page class="row items-center justify-evenly">
    <weather-view
      v-if="forecast"
      :forecast="forecast"
      :title="title"
      :key="refresh"
    />
  </q-page>
</template>

<script lang="ts">
import { Forecast } from 'components/models';
import WeatherView from 'src/components/WeatherView.vue';
import { computed, defineComponent, ref } from 'vue';
import { apiMeteo } from 'src/boot/axios';
import { useWeatherStore } from 'src/stores/weather-store';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

function fetchMeteo(
  latitude: number | undefined,
  longitude: number | undefined,
  isCelsius: boolean
) {
  const unit = isCelsius ? 'celsius' : 'fahrenheit';
  return apiMeteo
    .get(
      `?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=${unit}&forecast_days=1`
    )
    .then((r) => {
      return r.data;
    });
}

export default defineComponent({
  name: 'IndexPage',
  components: { WeatherView },
  setup() {
    const store = storeToRefs(useWeatherStore());
    let forecast = ref<Forecast>();
    watch(
      () => store.isCelsius.value,
      async (unit) => {
        forecast.value = await fetchMeteo(
          store.city.value?.latitude,
          store.city.value?.longitude,
          unit
        );
      }
    );
    watch(
      () => store.city.value?.id,
      async (newId, oldId) => {
        if (newId && newId !== oldId && store.city.value) {
          forecast.value = await fetchMeteo(
            store.city.value?.latitude,
            store.city.value?.longitude,
            store.isCelsius.value
          );
        }
      }
    );
    const title = computed(() => {
      return store.city.value?.label || null;
    });
    return {
      title,
      forecast,
    };
  },
});
</script>
