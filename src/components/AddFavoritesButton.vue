<template>
  <v-tooltip right>
    <template v-slot:activator="{ on }">
      <v-btn
        outlined
        @click="favoriteAction"
        :color="!isFav ? 'indigo lighten-2' : 'red'"
        v-on="on"
      >
        <v-icon :color="!isFav ? 'indigo lighten-2' : 'red'">mdi-star</v-icon>
      </v-btn>
    </template>
    <span>{{!isFav ? `Add ${town} favorites` : `Remove ${town} from favorites`}}</span>
  </v-tooltip>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddFavoritesButton',
  props: {
    town: String
  },
  data () {
    return {
      isFav: false
    }
  },
  computed: {
    ...mapState(['favorites'])
  },
  methods: {
    ...mapActions(['addFav', 'removeFav', 'isSet']),
    favoriteAction () {
      this.favorites.includes(this.town)
        ? this.favorites.splice(this.favorites.indexOf(this.town), 1)
        : this.favorites.push(this.town)
      this.isFav = !this.isFav
    }
  },
  created () {
    this.isFav = this.favorites.includes(this.town)
  }
}
</script>

<style scoped>

</style>
