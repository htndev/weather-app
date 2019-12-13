<template>
  <v-container class="pa-4 pl-10 pr-10">
    <v-alert
      color="red"
      transition="scale-transition"
      type="error"
      :value="errorAlert"
      class="alert"
      prominent
      border="right"
    >
      {{ alertText }}
    </v-alert>
    <h1>Home</h1>
    <v-row>
      <v-col
        lg="6"
        md="8"
        cols="6"
      >
        <v-text-field
          v-model="search"
          placeholder="E.g, Berlin"
          @keypress.enter="searchWeather"
        />
      </v-col>
      <v-col
        cols="1"
      />
      <v-col
        lg="1"
        md="1"
        align-self="center"
        cols="1"
      >
        <v-btn
          outlined
          color="deep-purple accent-4"
          @click="searchWeather"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-show="searchingInfo">
      <v-col
        lg="4"
        md="6"
        cols="12"
      >
        <WeatherCard
          :search="search"
          :weather="weather"
          :loading="loading"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { weatherMixin } from '../mixins/weather'
import WeatherCard from '../components/WeatherCard'

export default {
  name: 'Home',
  components: {
    WeatherCard
  },
  mixins: [weatherMixin],
  data: () => ({
    search: '',
    img: '',
    searchingInfo: false,
    errorAlert: false,
    alertText: ''
  }),
  computed: {
    ...mapState({
      weather: 'weatherInfo',
      weatherImages: 'weatherImages',
      loading: 'loadingContent',
      favs: 'favorites'
    })
  },
  methods: {
    ...mapActions(['getWeather']),
    ...mapMutations(['setLoading']),
    async searchWeather (event) {
      this.searchingInfo = true
      await this.getWeather(this.search).catch(error => {
        this.alertText = error.response.data.message
        this.errorAlert = true
        this.searchingInfo = false
        this.setLoading(false)
        // eslint-disable-next-line no-return-assign
        setTimeout(() => this.errorAlert = false, 4000)
      })
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42B983;
}

.container {
  position: relative;
}
</style>
