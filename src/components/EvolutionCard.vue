<script setup lang="ts">
import { computed } from 'vue'
import { Evolution } from '../composable/api/pokemonApi'

const props = defineProps<{
  evolution: Evolution
}>()

const thumbnail = computed(() => {
  return props.evolution.species.sprites?.front_default
    ? props.evolution.species.sprites?.front_default
    : '/no-image.png'
})
</script>

<template>
  <RouterLink
    :to="{ name: 'pokemon', params: { id: evolution.species.id } }"
    class="text-center"
  >
    <div class="mx-auto max-w-[150px]">
      <div class="relative w-full pt-[100%]">
        <img
          :src="thumbnail"
          alt=""
          class="absolute inset-0 h-auto w-full rounded-full border-8 border-[#A1A1A1]"
        />
      </div>
    </div>
    <div class="pb-2">
      <h5 class="mt-1 text-sm font-medium capitalize sm:text-base">
        {{ evolution.species.name }}
      </h5>
    </div>
  </RouterLink>
</template>
