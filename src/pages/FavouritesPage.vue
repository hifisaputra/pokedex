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
    <div class="mx-auto max-w-5xl py-6 px-4 bg-white min-h-screen">
      <div v-if="favouriteStore.favourites.length < 1">
        <p class="text-center">You don't have favourite Pokémon.</p>
      </div>

      <div
        class="relative grid grid-cols-3 gap-2 sm:grid-cols-6 md:grid-cols-8"
      >
        <PokemonCard
          v-for="pokemon in favouriteStore.favourites"
          :key="pokemon.name"
          :pokemon="pokemon"
        />
      </div>
    </div>
  </div>
</template>
