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
    {{alertText}}
  </v-alert>
    <h1>Home</h1>
    <v-row>
      <v-col
        lg="6"
        md="8"
        cols="6"
      >
        <v-text-field
          placeholder="E.g, Berlin"
          v-model="search"
          @keypress.enter="searchWeather"
        ></v-text-field>
      </v-col>
      <v-col
        cols="1"
      ></v-col>
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
        <v-skeleton-loader
          type="image, card-heading"
          :loading="loading"
        >
          <v-card @mouseover="mouseOn">
            <router-link :to="'/weather/' + search">
              <v-img :src="img"></v-img>
            </router-link>
            <v-card-title>{{weather.name}}</v-card-title>
            <v-card-text><strong>Temperature:</strong> {{weather | cardDescription}}°C</v-card-text>
            <v-card-text>
              <router-link :to="'/weather/' + search">Details</router-link>
            </v-card-text>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { weatherMixin } from '../mixins/weather'
import { isEmptyObject } from '../helpers'

export default {
  name: 'Home',
  data: () => ({
    search: '',
    img: '',
    searchingInfo: false,
    errorAlert: false,
    alertText: ''
  }),
  mixins: [weatherMixin],
  filters: {
    cardDescription: value => isEmptyObject(value) ? Math.round(value.main.temp) : ''
  },
  computed: {
    ...mapState({
      weather: 'weatherInfo',
      weatherImages: 'weatherImages',
      loading: 'loadingContent'
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
    },
    mouseOn (event) {
      // console.log(event)
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

.v-image {
  width: 100%;
  height: auto;
}

  .container {
    position: relative;
  }
</style>
