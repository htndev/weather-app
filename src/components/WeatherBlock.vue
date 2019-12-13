<template>
  <v-row>
    <v-col
      cols="12"
      md="7"
      lg="6"
    >
      <v-skeleton-loader
        type="image"
        :loading="loadingContent"
        transition="fade-transition"
      >
        <img
          :src="img"
          :alt="img"
        >
      </v-skeleton-loader>
    </v-col>
    <v-col
      cols="12"
      md="5"
      lg="6"
    >
      <v-skeleton-loader
        type="text"
        :loading="loadingContent"
        transition="fade-transition"
        title="Weather Info"
      >
        <h2>Country: {{ weather.name }}</h2>
      </v-skeleton-loader>
      <v-skeleton-loader
        type="text"
        :loading="loadingContent"
        transition="fade-transition"
        title="Weather Info"
      >
        <h2>Description: {{ weather.weather ? weather.weather[0].description : '' }}</h2>
      </v-skeleton-loader>
      <v-skeleton-loader
        type="text"
        :loading="loadingContent"
        transition="fade-transition"
        title="Weather Info"
      >
        <h2>Temperature: {{ weather.main ? Math.round(weather.main.temp) : '' }}°C</h2>
      </v-skeleton-loader>
      <v-skeleton-loader
        type="text"
        :loading="loadingContent"
        transition="fade-transition"
        title="Weather Info"
      >
        <h2>Wind: {{ weather.wind ? weather.wind.deg : '' }}</h2>
      </v-skeleton-loader>
      <v-skeleton-loader
        type="text"
        :loading="loadingContent"
        transition="fade-transition"
        title="Weather Info"
      >
        <h2>Direction: {{ direction }}</h2>
      </v-skeleton-loader>
      <v-skeleton-loader
        type="button"
        :loading="loadingContent"
        transition="fade-transition"
        title="Favorite"
      >
        <AddFavoritesButton :town="weather.name" />
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import {
  degToCompass,
  isEmptyObject
} from '../helpers'
import { mapState } from 'vuex'
import { weatherMixin } from '../mixins/weather'
import AddFavoritesButton from './AddFavoritesButton'

export default {
  name: 'WeatherBlock',
  components: {
    AddFavoritesButton
  },
  mixins: [ weatherMixin ],
  props: {
    weather: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    img: '',
    checked: true
  }),
  computed: {
    direction () {
      return isEmptyObject(this.weather) ? degToCompass(this.weather.wind.deg) : ''
    },
    ...mapState([ 'loadingContent', 'weatherImages' ])
  },
  methods: {
    isEmptyObject
  }
}
</script>

<style scoped lang="sass">
  img
    width: 100%
</style>
