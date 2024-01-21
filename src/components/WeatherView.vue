<template>
  <div class="weather-card">
    <q-bar class="bg-primary text-white text-center" dense>{{ title }} </q-bar>
    <q-card class="my-card q-pa-sm" flat bordered>
      <q-card-section class="row flex-center">
        <div
          class="column col-auto flex-center"
          style="border-bottom: 1px solid #c1bcbc"
        >
          <div class="text-h4 q-mb-xs">
            {{ temp }}
          </div>
          <div class="text-h5 q-mb-xs red" color="red">{{ weather }}</div>
          <div class="text-h7 q-mb-xs">
            {{ $t('temp') }}
            {{ forecast.current.temperature_2m
            }}{{ forecast.current_units.temperature_2m }}
          </div>
          <div class="text-h7 q-mb-xs">
            {{ $t('feels_like') }}
            {{ forecast.current.apparent_temperature
            }}{{ forecast.current_units.apparent_temperature }}
          </div>
          <!-- <div class="col no-wrap items-center">
            <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
          </div> -->
          <!-- <q-img src="https://cdn.quasar.dev/img/mountains.jpg" /> -->
        </div>
        <q-list class="col-auto" dense>
          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="air" size="lg" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ $t('wind') }}
              </q-item-label>
              <q-item-label caption>
                {{ forecast.current.wind_speed_10m }}
                {{ forecast.current_units.wind_speed_10m }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="blue" name="water_drop" size="lg" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $t('humidity') }}</q-item-label>
              <q-item-label caption>
                {{ forecast.current.relative_humidity_2m
                }}{{ forecast.current_units.relative_humidity_2m }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="red" name="line_weight" size="lg" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $t('pressure') }}</q-item-label>
              <q-item-label caption>
                {{ forecast.current.surface_pressure
                }}{{ forecast.current_units.surface_pressure }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list class="col-auto" dense>
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="north_east" size="lg" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $t('wind_dir') }}</q-item-label>
              <q-item-label caption>55km/h</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="blue" name="water" size="lg" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $t('precipit_probability') }}</q-item-label>
              <q-item-label caption>
                {{ forecast.daily.precipitation_probability_max[0]
                }}{{ forecast.daily_units.precipitation_probability_max[0] }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="grey" name="filter_drama" size="lg" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $t('cloud_cover') }}</q-item-label>
              <q-item-label caption>
                {{ forecast.current.cloud_cover
                }}{{ forecast.current_units.cloud_cover }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <!-- <q-card-actions vertical class="justify-around q-px-md">
          <q-btn flat round color="red" icon="favorite" />
          <q-btn flat round color="accent" icon="bookmark" />
          <q-btn flat round color="primary" icon="share" />
        </q-card-actions> -->
      </q-card-section>
    </q-card>
    <div>
      <!-- <h2>City:</h2> -->
      <!-- {{ city }} -->
      <!-- {{ forecast }} -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Forecast } from './models';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'WeatherView',
  props: {
    forecast: {
      type: Object as PropType<Forecast>,
      required: true,
    },
    title: {
      type: String as PropType<string | null>,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const weather = computed(() => {
      const { snowfall, precipitation, rain, showers, cloud_cover, is_day } =
        props.forecast.current;
      if (snowfall) return t('snow');
      if (showers) return t('showers');
      if (rain || precipitation) return t('rain');
      if (cloud_cover > 10) return t('partially_cloudy');
      if (cloud_cover > 80) return t('cloudy');

      return is_day ? 'Sun' : 'Moon';
    });
    const temp = computed(() => {
      const { daily, daily_units } = props.forecast;
      const sign_min = daily.temperature_2m_min[0] > 0 ? '+' : '';
      const sign_max = daily.temperature_2m_max[0] > 0 ? '+' : '';
      const min = `${sign_min}${daily.temperature_2m_min[0]}${daily_units.temperature_2m_min[0]}`;
      const max = `${sign_max}${daily.temperature_2m_max[0]}${daily_units.temperature_2m_max[0]}`;
      return `${min}${max}`;
    });
    return { weather, temp };
  },
});
</script>

<style lang="scss">
.weather-card {
  max-width: 700px;
  margin: 20px auto 0px;
  .q-list {
    min-width: 200px;
    .q-item__section {
      padding: 0;
      min-width: 42px;
    }
  }
}
</style>
