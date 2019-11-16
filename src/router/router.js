import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import NotFound from '../views/404'
import WeatherInTown from '../views/WeatherInTown'
import Favorites from '../views/Favorites'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/weather/:townTitle',
      name: 'Weather',
      component: WeatherInTown
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.params.townTitle || to.name
  return next()
})

export default router
