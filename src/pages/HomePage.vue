<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFetchPokemon } from '../composable/api/pokemonApi'
import TypeFilter from '../components/TypeFilter.vue'
import PokemonCard from '../components/PokemonCard.vue'

const { loading, response, call } = useFetchPokemon()

const params = ref({
  types: [],
  limit: 12,
  offset: 0
})
const showFilterBar = ref(false)

onMounted(() => {
  fetchPokemon()
})

const fetchPokemon = () => {
  call(params.value.limit, params.value.offset, params.value.types)
}

const filter = () => {
  params.value.offset = 0
  fetchPokemon()
  showFilterBar.value = false
}
</script>

<template>
  <div>
    <div class="mx-auto max-w-5xl py-10 px-4">
      <a
        href=""
        @click.prevent="showFilterBar = true"
        class="fixed bottom-6 right-[50%] translate-x-[50%] rounded-full bg-gray-700 px-5 py-1 text-sm text-white"
        >Filter</a
      >
      <div v-if="showFilterBar" class="fixed inset-0 bg-white px-4 py-8">
        <div class="flex items-start justify-between">
          <div>
            <h5 class="text-lg font-semibold">Filter</h5>
            <span class="text-xs text-gray-500">Search Pokémon by types (max 2 selection, since Pokémon can only have either one or two types)</span>
          </div>
          <a href="" @click.prevent="showFilterBar = false">
            <img src="/x-icon.svg" alt="Close Icon" class="w-6" />
          </a>
        </div>
        <TypeFilter v-model="params.types" class="mt-4 mb-6" />
        <a
          href=""
          @click.prevent="filter"
          class="block w-full rounded-md bg-orange-600 py-3 text-center text-white hover:bg-orange-700"
          >Apply Filter ({{ params.types.length }})</a
        >
      </div>

      <div class="grid grid-cols-3 gap-2">
        <PokemonCard
          v-for="pokemon in response?.results"
          :key="pokemon.name"
          :pokemon="pokemon"
        />
      </div>
    </div>
  </div>
</template>
