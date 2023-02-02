<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useFetchPokemon } from '../composable/api/pokemonApi'
import TypeFilter from '../components/TypeFilter.vue'
import PokemonCard from '../components/PokemonCard.vue'

const { loading, response, call } = useFetchPokemon()

const params = ref({
  types: '',
  limit: 32,
  offset: 0
})
const showFilterBar = ref(false)
const scrollComponent = ref<any>(null)

onMounted(() => {
  fetchPokemon()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  let element = scrollComponent.value

  if (!element) return
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    loadMore()
  }
}

const fetchPokemon = () => {
  call(params.value.limit, params.value.offset, params.value.types)
}

const filter = () => {
  params.value.offset = 0
  fetchPokemon()
  showFilterBar.value = false
}

const loadMore = () => {
  if (loading.value) return
  params.value.offset = params.value.offset + params.value.limit
  if (response.value && response.value?.count <= params.value.offset) return
  fetchPokemon()
}
</script>

<template>
  <div>
    <div
      v-if="response?.results && response?.results.length < 1 && !loading"
      class="mx-auto max-w-5xl py-6 px-4"
    >
      <p class="text-center">No Pokémon matched your search.</p>
    </div>
    <div class="mx-auto max-w-5xl py-6 px-4">
      <a
        href=""
        @click.prevent="showFilterBar = true"
        class="fixed bottom-10 right-[50%] z-40 translate-x-[50%] rounded-full bg-gray-700 px-5 py-1 text-sm text-white"
        >Filter</a
      >
      <div v-if="showFilterBar" class="fixed inset-0 z-40 bg-white px-4 py-8">
        <div class="mx-auto max-w-5xl">
          <div class="flex items-start justify-between">
            <div>
              <h5 class="text-lg font-semibold">Filter</h5>
              <span class="text-xs text-gray-500">Search Pokémon by type</span>
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
            >Search</a
          >
        </div>
      </div>

      <div class="relative">
        <div
          v-if="loading && response?.results && response?.results.length < 1"
          class="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 py-10"
        >
          <img src="/spinner.svg" alt="" />
        </div>
        <div
          class="relative grid grid-cols-3 gap-2 sm:grid-cols-6 md:grid-cols-8"
          ref="scrollComponent"
        >
          <div v-for="pokemon in response?.results" :key="pokemon.name">
            <PokemonCard :pokemon="pokemon" />
          </div>
        </div>
        <div
          v-if="loading && response?.results && response?.results.length > 0"
        >
          <img class="mx-auto mb-16" src="/spinner.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
