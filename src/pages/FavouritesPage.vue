<script setup lang="ts">
import { onMounted } from 'vue'
import { useFavouriteStore } from '../store/useFavouriteStore'
import PokemonCard from '../components/PokemonCard.vue'

const favouriteStore = useFavouriteStore()

onMounted(() => {
  favouriteStore.fetchFavourites()
})
</script>

<template>
  <div>
    <div class="mx-auto max-w-5xl py-10 px-4">
      <div class="relative grid grid-cols-3 gap-2">
        <PokemonCard
          v-for="pokemon in favouriteStore.favourites"
          :key="pokemon.name"
          :pokemon="pokemon"
        />
      </div>
    </div>
  </div>
</template>
