<script setup lang="ts">
import { computed } from 'vue'
import { Pokemon } from '../composable/api/pokemonApi'
import TypePill from './TypePill.vue'

const props = defineProps<{
  pokemon: Pokemon
}>()

const thumbnail = computed(() => {
  return props.pokemon.sprites?.front_default
    ? props.pokemon.sprites?.front_default
    : '/no-image.png'
})
</script>

<template>
  <RouterLink :to="{ name: 'pokemon', params: { id: pokemon.id } }">
    <img :src="thumbnail" alt="" class="mx-auto mt-2 rounded-md bg-gray-300" />
    <div class="px-2 pb-2">
      <span class="text-xs text-gray-500"
        >#{{ ('000' + pokemon.id).slice(-4) }}</span
      >
      <h5 class="mt-1 text-sm font-medium capitalize sm:text-base">
        {{ pokemon.name }}
      </h5>
      <div class="flex flex-wrap">
        <TypePill
          v-for="item in pokemon.types"
          :key="item.type.name"
          :name="item.type.name"
          class="mr-1 mb-1"
        />
      </div>
    </div>
  </RouterLink>
</template>
