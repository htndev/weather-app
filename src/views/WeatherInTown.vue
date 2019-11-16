<template>
    <v-container>
      <v-banner
        single-line
        elevation="2"
        v-if="!cityFound"
      >
      {{errorText}}
      <template v-slot:actions>
        <v-btn
          outlined
          color="red accent-4"
          large
        >
          <router-link to="/" class="red--text">HOME</router-link>
        </v-btn>
      </template>
    </v-banner>
      <WeatherBlock :weather="weatherInfo" v-else></WeatherBlock>
    </v-container>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'

import WeatherBlock from '../components/WeatherBlock'

export default {
  name: 'WeatherInTown',

  computed: {
    ...mapState([ 'weatherInfo' ])
  },

  components: {
    WeatherBlock
  },

  methods: {
    ...mapActions([ 'getWeather', 'setLoading' ])
  },

  data: () => ({
    errorAlert: false,
    errorText: '',
    cityFound: true
  }),

  created () {
    // eslint-disable-next-line handle-callback-err
    this.getWeather(this.$route.params.townTitle).catch(err => {
      this.cityFound = false
      this.errorText = err.response.data.message
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.errorAlert = false, 4000)
    })
  }
}
</script>
