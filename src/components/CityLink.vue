<template>
  <q-item
    clickable
    tag="a"
    dense
    :active="active"
    @click="$emit('set-city', link)"
  >
    <q-item-section avatar>
      <q-icon
        :name="active ? 'check_circle_outline' : 'radio_button_unchecked'"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ link.name }}</q-item-label>
      <q-item-label caption>{{ link.country }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { City } from 'components/models';
export default defineComponent({
  name: 'CityLink',
  props: {
    link: {
      type: Object as PropType<City>,
      required: true,
    },

    active: {
      type: Boolean,
      default: false,
    },

    // link: {
    //   type: String,
    //   default: '#',
    // },

    // icon: {
    //   type: String,
    //   default: '',
    // },
  },
});
</script>
