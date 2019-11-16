import Vue from 'vue'
import Vuex from 'vuex'
import weatherCfg from '../config/weather'
import axios from 'axios'
import { templateString } from '../helpers'
import Ash from '../assets/img/Ash.jpg'
import Clear from '../assets/img/Clear.jpg'
import Clouds from '../assets/img/Clouds.jpg'
import Drizzle from '../assets/img/Drizzle.jpg'
import Dust from '../assets/img/Dust.jpg'
import Fog from '../assets/img/Fog.jpg'
import Haze from '../assets/img/Haze.jpg'
import Mist from '../assets/img/Mist.jpg'
import Rain from '../assets/img/Rain.jpg'
import Sand from '../assets/img/Sand.jpeg'
import Smoke from '../assets/img/Smoke.jpg'
import Snow from '../assets/img/Snow.jpg'
import Squall from '../assets/img/Squall.jpg'
import Thunderstorm from '../assets/img/Thunderstorm.jpg'
import Tornado from '../assets/img/Tornado.jpg'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weatherInfo: {},
    weatherImages: {
      Ash, Clear, Clouds, Drizzle, Dust, Fog, Haze, Mist, Rain, Sand, Smoke, Squall, Thunderstorm, Tornado, Snow
    },
    loadingContent: true,
    favorites: {

    }
  },
  getters: {},
  mutations: {
    setWeather (state, payload) {
      state.weatherInfo = payload
    },
    setLoading (state, payload) {
      state.loadingContent = payload
    },
    clearWeather (state) {
      state.weatherInfo = {}
      state.loadingContent = false
    }
  },
  actions: {
    async getWeather ({ commit, dispatch }, data) {
      commit('setLoading', true)
      const link = templateString(weatherCfg.currentWeather, {
          town: data, API_KEY: weatherCfg.API_KEY
        }),
        d = await axios.get(link)

      if (d === undefined) throw d

      commit('setWeather', d.data)
      commit('setLoading', false)
    }
  }
})
