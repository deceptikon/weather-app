<template>
  <div>
    <q-select
      filled
      v-model="model"
      use-input
      input-debounce="0"
      label="Search city"
      :options="options"
      @filter="filterFn"
      style="margin: 10px"
      :loading="loading"
      @update:model-value="(v) => store.setCity(v)"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
    {{ weather.city }}
    {{ weather.lastCities }}
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  toRef,
  Ref,
  onMounted,
  reactive,
} from 'vue';
import { apiCities } from 'boot/axios';
import { useWeatherStore } from 'stores/weather-store';
import { storeToRefs } from 'pinia';
import { Todo, Meta } from './models';

// function useClickCount() {
//   const clickCount = ref(0);
//   function increment() {
//     clickCount.value += 1;
//     return clickCount.value;
//   }

//   return { clickCount, increment };
// }

// function useDisplayTodo(todos: Ref<Todo[]>) {
//   const todoCount = computed(() => todos.value.length);
//   return { todoCount };
// }
export default defineComponent({
  name: 'CityFinder',
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
        .get('?namePrefix=' + str)
        .then(({ data: { data } }) => {
          options.value = data.map((o) => ({
            label: `${o.name} ${o.country}`,
            value: `${o.latitude} ${o.longitude}`,
          }));
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

        if (val.length < 4) {
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
