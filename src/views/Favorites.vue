<template>
  <v-container>
    <v-row>
      <h1>Favorites</h1>
    </v-row>
    <v-row v-if="favorites.length">
      <v-col
        v-for="favorite in weathers"
        :key="favorite.name"
        cols="12"
        md="6"
        lg="4"
      >
        <WeatherCard
          :search="favorite.name"
          :weather="favorite"
          class="pa-2"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <h2>Sorry, you have no favorite weathers.</h2>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { getCurrentWeather } from '../helpers'
import WeatherCard from '../components/WeatherCard'

export default {
  name: 'Favorites',
  computed: {
    ...mapState(['favorites'])
  },
  components: {
    WeatherCard
  },
  data: () => ({
    weathers: []
  }),
  watch: {
    favorites () {
      this.getWeathers()
    }
  },
  methods: {
    ...mapActions(['getWeather']),
    ...mapMutations(['setLoading']),
    async getWeathers () {
      this.setLoading(true)
      this.weathers = []
      for (const town of this.favorites) {
        this.weathers.push((await getCurrentWeather(town)).data)
      }
      this.setLoading(false)
    }
  },
  async created () {
    this.getWeathers()
  }
}
</script>

<style scoped>

</style>
