<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> {{ $t('appTitle') }} </q-toolbar-title>

        <div>
          <q-btn
            v-if="$i18n.locale === 'en'"
            round
            size="sm"
            dense
            glossy
            class="q-mr-sm"
            @click="$i18n.locale = 'ru'"
            >ru</q-btn
          >
          <q-btn
            v-else
            round
            size="sm"
            dense
            glossy
            class="q-mr-sm"
            @click="$i18n.locale = 'en'"
            >en</q-btn
          >
          <q-btn
            round
            :outline="$q.dark.isActive"
            size="sm"
            dense
            :glossy="!$q.dark.isActive"
            icon="dark_mode"
            @click="$q.dark.toggle"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above overlay bordered>
      <city-finder />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CityFinder from 'components/CityFinder.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    CityFinder,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
