<script setup lang="ts">
import { Pokemon } from '../composable/api/pokemonApi'
import TypePill from './TypePill.vue'

const props = defineProps<{
  pokemon: Pokemon
}>()
</script>

<template>
  <div>
    <img
      :src="pokemon.sprites?.front_default"
      alt=""
      class="mx-auto mt-2 rounded-md bg-gray-300"
    />
    <div class="px-2 pb-2">
      <span class="text-xs text-gray-500"
        >#{{ ('000' + pokemon.id).slice(-4) }}</span
      >
      <h5 class="mt-1 text-base font-medium capitalize">{{ pokemon.name }}</h5>
      <div class="flex flex-wrap">
        <TypePill
          v-for="item in pokemon.types"
          :key="item.type.name"
          :name="item.type.name"
          class="mr-1 mb-1"
        />
      </div>
    </div>
  </div>
</template>
