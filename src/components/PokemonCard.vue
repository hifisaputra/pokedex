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
    <div class="relative w-full pt-[100%]">
      <img
        :src="thumbnail"
        alt=""
        class="absolute inset-0 h-auto w-full rounded-2xl bg-[#D9D9D9]"
      />
    </div>
    <div class="pb-2">
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
