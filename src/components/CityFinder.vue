<template>
  <div>
    <q-select
      v-model="model"
      use-input
      input-debounce="1000"
      hide-selected
      fill-input
      options-dense
      hide-bottom-space
      :label="$t('search_city')"
      :options="options"
      @filter="filterFn"
      style="margin: 10px"
      :loading="loading"
      @update:model-value="(c) => store.setCity(c)"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ $t('search_city') }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <city-link v-if="weather.city.value" :link="weather.city.value" active />
    <q-item-label header v-if="weather.lastCities.value.length">
      {{ $t('recently_viewed') }}
    </q-item-label>
    <q-list>
      <CityLink
        v-for="(link, index) in weather.lastCities.value"
        :key="index"
        :link="link"
        @set-city="(e) => store.setCity(e)"
      />
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { apiCities } from 'boot/axios';
import { useWeatherStore } from 'stores/weather-store';
import { storeToRefs } from 'pinia';
import { CityResponse } from './models';
import CityLink from 'components/CityLink.vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'CityFinder',
  components: {
    CityLink,
  },
  setup() {
    let options = ref([]);
    let loading = ref(false);
    const store = useWeatherStore();
    const weather = storeToRefs(store);
    const { locale } = useI18n();
    function fetchCities(str: string) {
      loading.value = true;
      apiCities
        .get(`?languageCode=${locale.value}&namePrefix=${str}&limit=10`)
        .then(({ data: { data } }) => {
          options.value = data.map((o: CityResponse) => {
            const { name, country, latitude, longitude, id } = o;
            return {
              label: `${name}, ${country}`,
              name,
              country,
              latitude: Number(latitude),
              longitude: Number(longitude),
              id,
            };
          });
        })
        .finally(() => (loading.value = false));
    }

    return {
      model: ref(null),
      // eslint-disable-next-line @typescript-eslint/ban-types
      filterFn(val: string, update: Function, abort: Function) {
        if (val === '') {
          update(() => {
            fetchCities('');
          });
          return;
        }

        if (val.length < 2) {
          abort();
          return;
        }

        update(() => {
          fetchCities(val);
        });
      },
      options,
      loading,
      weather,
      store,
      locale,
    };
  },
});
</script>
