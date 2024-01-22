<template>
  <div class="weather-card">
    <q-bar class="bg-primary text-white text-center" dense>{{ title }} </q-bar>
    <q-card class="my-card q-pa-sm" flat bordered>
      <q-card-section class="row flex-center">
        <div
          class="column col-auto flex-center"
          style="border-bottom: 1px solid #c1bcbc"
        >
          <div class="text-h5 q-mb-xs">
            <span class="material-symbols-outlined text-primary text-h2">
              {{ weather_icon[weather] }}
            </span>
            {{ temp }}
          </div>
          <div class="text-h6 q-mb-xs text-primary" color="red">
            {{ $t(weather) }}
          </div>
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
              <q-item-label caption>
                {{ forecast.current.wind_direction_10m }}
                {{ forecast.current_units.wind_direction_10m }}
              </q-item-label>
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
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Forecast } from './models';

const weather_icon = {
  sun: 'clear_day',
  moon: 'clear_night',
  cloudy: 'filter_drama',
  partly_cloudy_day: 'partly_cloudy_day',
  partly_cloudy_night: 'partly_cloudy_night',
  snow: 'weather_snowy',
  rain: 'rainy',
  showers: 'thunderstorm',
};

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
    const weather = computed(() => {
      const { snowfall, precipitation, rain, showers, cloud_cover, is_day } =
        props.forecast.current;
      if (snowfall) return 'snow';
      if (showers) return 'showers';
      if (rain || precipitation) return 'rain';
      if (cloud_cover > 10 && cloud_cover < 75)
        return is_day ? 'partly_cloudy_day' : 'partly_cloudy_night';
      if (cloud_cover >= 75) return 'cloudy';

      return is_day ? 'sun' : 'moon';
    });
    const temp = computed(() => {
      const { daily, daily_units } = props.forecast;
      const sign_min = daily.temperature_2m_min[0] > 0 ? '+' : '';
      const sign_max = daily.temperature_2m_max[0] > 0 ? '+' : '';
      const min = `${sign_min}${daily.temperature_2m_min[0]}${daily_units.temperature_2m_min[0]}`;
      const max = `${sign_max}${daily.temperature_2m_max[0]}${daily_units.temperature_2m_max[0]}`;
      return `${min}${max}`;
    });
    return { weather, temp, weather_icon };
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
