<template>
  <v-skeleton-loader
    type="image, card-heading"
    :loading="loading"
  >
    <v-card>
      <router-link :to="'/weather/' + search">
        <v-img :src="img" />
      </router-link>
      <v-card-title>{{ weather.name }}</v-card-title>
      <v-card-text><strong>Temperature:</strong> {{ weather | cardDescription }}°C</v-card-text>
      <v-card-actions>
        <router-link :to="'/weather/' + search">
          Details
        </router-link>
        <v-spacer />
        <AddFavoritesButton :town="search" />
      </v-card-actions>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import AddFavoritesButton from './AddFavoritesButton'
import { isEmptyObject } from '../helpers'
import { weatherMixin } from '../mixins/weather'
import { mapState } from 'vuex'

export default {
  name: 'WeatherCard',
  props: {
    search: String,
    weather: Object,
    loading: Boolean
  },
  computed: {
    ...mapState(['weatherImages'])
  },
  filters: {
    cardDescription: value => isEmptyObject(value) ? Math.round(value.main.temp) : ''
  },
  components: {
    AddFavoritesButton
  },
  mixins: [weatherMixin],
  data: () => ({
    img: ''
  }),
  created () {
    if (isEmptyObject(this.weather)) {
      this.img = this.weatherImages[ this.weather.weather[0].main ]
    }
  }
}
</script>

<style scoped>

</style>
