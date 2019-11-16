import { isEmptyObject } from '../helpers'

export const weatherMixin = {
  watch: {
    weather () {
      this.img = this.weatherImages[ this.weather.weather[ 0 ].main ]
    }
  },
  filters: {
    isEmpty: value => isEmptyObject(value) ? value : ''
  }
}
