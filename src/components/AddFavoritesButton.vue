<template>
  <v-tooltip right>
    <template v-slot:activator="{ on }">
      <v-btn
        outlined
        :color="!isFav ? 'indigo lighten-2' : 'red'"
        @click="favoriteAction"
        v-on="on"
      >
        <v-icon :color="!isFav ? 'indigo lighten-2' : 'red'">
          mdi-star
        </v-icon>
      </v-btn>
    </template>
    <span>{{ !isFav ? `Add ${town} favorites` : `Remove ${town} from favorites` }}</span>
  </v-tooltip>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'AddFavoritesButton',
  props: {
    town: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isFav: false
    }
  },
  computed: {
    ...mapState(['favorites'])
  },
  created () {
    this.isFav = this.favorites.includes(this.town)
  },
  methods: {
    ...mapActions(['addFav', 'removeFav', 'isSet']),
    ...mapMutations(['addFavorite', 'removeFavorite']),
    favoriteAction () {
      this.favorites.includes(this.town)
        ? this.removeFavorite(this.favorites.indexOf(this.town))
        : this.addFavorite(this.town)
      this.isFav = !this.isFav
    }
  }
}
</script>

<style scoped>

</style>
