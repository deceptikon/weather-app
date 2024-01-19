<template>
  <div style="max-width: 500px; margin: 20px auto" class="weather-card">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <div class="column">
          <!-- <div class="text-h6 q-mb-xs">Bishkek</div> -->
          <div class="text-h2 q-mb-xs">
            {{ forecast.daily.temperature_2m_min[0]
            }}{{ forecast.daily_units.temperature_2m_min[0] }}&nbsp;{{
              forecast.daily.temperature_2m_max[0]
            }}{{ forecast.daily_units.temperature_2m_max[0] }}
          </div>
          <div class="text-h5 q-mb-xs red" color="red">{{ weather }}</div>
          <div class="text-h7 q-mb-xs">
            Current temp.
            {{ forecast.current.temperature_2m }}
            {{ forecast.current_units.temperature_2m }}
          </div>
          <div class="text-h7 q-mb-xs">
            Feels like
            {{ forecast.current.apparent_temperature }}
            {{ forecast.current_units.apparent_temperature }}
          </div>
          <!-- <div class="col no-wrap items-center">
            <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
          </div> -->
          <!-- <q-img src="https://cdn.quasar.dev/img/mountains.jpg" /> -->
        </div>
        <q-list>
          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="air" size="lg" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Wind</q-item-label>
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
              <q-item-label>Humidity</q-item-label>
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
              <q-item-label>Pressure</q-item-label>
              <q-item-label caption>
                {{ forecast.current.surface_pressure
                }}{{ forecast.current_units.surface_pressure }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="north_east" size="lg" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Wind direction</q-item-label>
              <q-item-label caption>55km/h</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="blue" name="water" size="lg" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Precipitation probability</q-item-label>
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
              <q-item-label>Cloud cover</q-item-label>
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
import { defineComponent, PropType, computed, ref, toRef, Ref } from 'vue';
import { Forecast } from './models';

export default defineComponent({
  name: 'WeatherView',
  props: {
    forecast: {
      type: Object as PropType<Forecast>,
      required: true,
    },
  },
  setup(props) {
    const weather = computed(() => {
      const { snowfall, precipitation, rain, showers, cloud_cover, is_day } =
        props.forecast.current;
      if (snowfall) return 'Snow';
      if (showers) return 'Showers';
      if (rain || precipitation) return 'Rain';
      if (cloud_cover > 10) return 'Partially Cloudy';
      if (cloud_cover > 80) return 'Cloudy';

      return is_day ? 'Sun' : 'Moon';
    });
    return { weather };
  },
});
</script>

<style lang="scss">
.weather-card {
  .q-list {
    .q-item__section {
      padding: 0;
      min-width: 42px;
    }
  }
}
</style>
