<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGetPokemon, Pokemon } from '../composable/api/pokemonApi'
import { useFavouriteStore } from '../store/useFavouriteStore'
import PokemonStat from '../components/PokemonStat.vue'
import TypePill from '../components/TypePill.vue'

const route = useRoute()
const { response, call } = useGetPokemon()

const favouriteStore = useFavouriteStore()

onMounted(() => {
  call(route.params.id as string)
  favouriteStore.fetchFavourites()
})

const isFavourite = computed(() => {
  const itemIndex = favouriteStore.favourites.findIndex(
    (item) => item.name === response.value?.name
  )

  return itemIndex > -1
})

const onClickFavourite = (pokemon: Pokemon) => {
  if (pokemon) favouriteStore.toggleFavourite(pokemon)
}

const thumbnail = computed(() => {
  return (response.value && response.value.sprites?.front_default) ? response.value.sprites?.front_default : '/no-image.png'
})
</script>

<template>
  <div class="mx-auto max-w-5xl py-10 px-4">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="flex">
      <div class="mr-4">
        <img
          class="rounded-lg bg-gray-200 py-4 px-4"
          :src="thumbnail"
          alt=""
        />
      </div>
      <div>
        <h5 class="text-2xl font-bold capitalize">
          {{ response?.name }}
          <span class="text-base text-gray-500"
            >#{{ ('000' + response?.id).slice(-4) }}</span
          >
        </h5>

        <div class="mt-4">
          <div class="mt-2 flex flex-wrap">
            <TypePill
              v-for="item in response?.types"
              :key="item.type.name"
              :name="item.type.name"
              class="mr-2"
            />
          </div>
        </div>

        <div class="mt-4">
          <a
            href=""
            @click.prevent="onClickFavourite(response as Pokemon)"
            class="rounded-md px-4 py-1 text-sm text-white"
            :class="isFavourite ? 'bg-orange-800' : 'bg-orange-600'"
            >{{ isFavourite ? 'Favourited' : 'Favourite' }}</a
          >
        </div>
      </div>
    </div>

    <div class="mt-10 md:mt-0 rounded-lg bg-gray-400 py-4 px-4">
      <h5>Stats</h5>
      <div class="mt-3 grid grid-cols-6 gap-2">
        <PokemonStat
          v-for="item in response?.stats"
          :key="item.stat.name"
          :name="item.stat.name"
          :value="item.base_stat"
        />
      </div>
    </div>
    </div>

    <div class="mt-10">
      <span class="text-sm font-semibold">Abilities</span> <br />
      <ul class="list-disc pl-6">
        <li
          v-for="item in response?.abilities"
          :key="item.ability.name"
          class="text-sm capitalize"
        >
          {{ item.ability.name }}
        </li>
      </ul>
    </div>
    <div class="mt-10">
      <span class="text-sm font-semibold">Moves</span> <br />
      <ul class="grid list-disc grid-cols-2 pl-6 sm:grid-cols-4 md:grid-cols-5">
        <li
          v-for="item in response?.moves"
          :key="item.move.name"
          class="text-sm capitalize"
        >
          {{ item.move.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
