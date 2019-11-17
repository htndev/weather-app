<template>
  <v-app>
    <v-app-bar
      app
      dark
      color="deep-purple accent-4"
    >

      <router-link to="/" class="white--text">Weather App</router-link>

      <v-spacer></v-spacer>
      <router-link to="/favorites" class="mr-5 white--text">Favorites</router-link>
      <v-btn
        outlined
        text
        @click="findLocation"
      >
        <v-icon>mdi-compass</v-icon>
      </v-btn>
      <v-btn
        href="https://openweathermap.org/api"
        target="_blank"
        text
        outlined
        color="white"
        class="ml-2"
      >
        API
      </v-btn>
    </v-app-bar>

    <v-content>
      <transition name="fade">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['getWeather']),
    async findLocation () {
      const data = await axios.get('https://api.ipify.org?format=json').catch(error => console.log(error)),
        ipInfo = await axios.get(`http://api.ipstack.com/${data.data.ip}?access_key=1cd530d4fb1d4b6812a5fef00d3a4e4f`)
      if (this.$route.params.townTitle !== ipInfo.data.city) {
        await this.getWeather(ipInfo.data.city)
        await this.$router.push({ name: 'Weather',
          params: {
            townTitle: ipInfo.data.city
          } })
      }
    }
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }

  .v-alert.alert {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: auto;
  }

  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .v-image {
    width: 100%;
    height: auto;
  }
</style>
