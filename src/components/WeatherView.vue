<template>
  <div style="max-width: 500px; margin: 20px auto">
    <div>
      <h2>City:</h2>
      <!-- {{ city }} -->
      {{ forecast }}
    </div>
    <!-- <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRef, Ref } from 'vue';
import { Forecast } from './models';
import { useWeatherStore } from 'stores/weather-store';
import { storeToRefs } from 'pinia';

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
  name: 'WeatherView',
  props: {
    // title: {
    //   type: String,
    //   required: true,
    // },
    // todos: {
    //   type: Array as PropType<Todo[]>,
    //   default: () => [],
    // },
    forecast: {
      type: Object as PropType<Forecast>,
      required: true,
    },
    // active: {
    //   type: Boolean,
    // },
  },
  setup(props) {
    // return { ...useClickCount(), ...useDisplayTodo(toRef(props, 'todos')) };
  },
});
</script>
