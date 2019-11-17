import weatherCfg from '../config/weather'
import axios from 'axios'

export const templateString = (expression, valueObj) => expression.replace(/{{\s?([^{}\s]*)\s?}}/g, (substring, value, index) => {
  value = valueObj[ value ]
  return value
})

export const degToCompass = deg => {
  const dirs = [ 'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW' ],
    ind = ~~((deg / 22.5) + 0.5) % 16
  return dirs[ind]
}

export const isEmptyObject = (obj = {}) => !!Object.keys(obj).length

export const getCurrentWeather = town => axios.get(templateString(weatherCfg.currentWeather, { town, API_KEY: weatherCfg.API_KEY }))
