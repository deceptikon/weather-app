<template>
  <div>
    <q-select
      v-model="model"
      use-input
      input-debounce="0"
      hide-selected
      options-dense
      hide-bottom-space
      label="Search city"
      :options="options"
      @filter="filterFn"
      style="margin: 10px"
      :loading="loading"
      @update:model-value="(c) => store.setCity(c)"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
    <city-link v-if="weather.city.value" :link="weather.city.value" active />
    <q-item-label header> Recently viewed </q-item-label>
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

export default defineComponent({
  name: 'CityFinder',
  components: {
    CityLink,
  },
  props: {
    // title: {
    //   type: String,
    //   required: true
    // },
    // todos: {
    //   type: Array as PropType<Todo[]>,
    //   default: () => []
    // },
    // meta: {
    //   type: Object as PropType<Meta>,
    //   required: true
    // },
    // active: {
    //   type: Boolean
    // }
  },
  setup(props) {
    let options = ref([]);
    let loading = ref(false);
    const store = useWeatherStore();
    const weather = storeToRefs(store);

    function fetchCities(str: string) {
      loading.value = true;
      apiCities
        .get('?languageCode=ru&namePrefix=' + str)
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
      filterFn(val: string, update: any, abort: any) {
        if (val === '' && !options.value?.length) {
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
    };
    // return { ...useClickCount(), ...useDisplayTodo(toRef(props, 'todos')) };
  },
});
</script>
