<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useGetPokemon, Pokemon } from '../composable/api/pokemonApi'
import { useFavouriteStore } from '../store/useFavouriteStore'
import PokemonStat from '../components/PokemonStat.vue'
import TypePill from '../components/TypePill.vue'
import EvolutionCard from '../components/EvolutionCard.vue'

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
  return response.value && response.value.sprites?.front_default
    ? response.value.sprites?.front_default
    : '/no-image.png'
})

const selectedVersion = ref<string>('red')
const versionToBeIncluded = [
  'red',
  'blue',
  'yellow',
  'gold',
  'silver',
  'ruby',
  'sapphire'
]
const flavorTexts = computed(() => {
  if (
    !response.value?.species ||
    !response.value.species ||
    !response.value.species.flavor_text_entries
  )
    return []

  return response.value.species.flavor_text_entries.filter((item) =>
    versionToBeIncluded.includes(item.version.name)
  )
})

const selectedFlavorText = computed(() => {
  const selected = flavorTexts.value.find(
    (item) => item.version.name === selectedVersion.value
  )
  if (selected) return selected.flavor_text

  return ''
})
</script>

<template>
  <div
    class="mx-auto min-h-screen max-w-5xl bg-white py-6 px-6 md:px-20 md:py-10"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 md:gap-6">
      <div>
        <div class="flex">
          <div class="mr-4">
            <img
              class="rounded-2xl bg-[#D9D9D9] py-4 px-4"
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

            <div class="mt-2">
              <p class="font-semibold">Type</p>
              <div class="flex flex-wrap">
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
        <div class="mt-4">
          {{ selectedFlavorText }}
        </div>
        <div class="mt-4">
          <label>Version:</label>
          <select v-model="selectedVersion" class="capitalize">
            <option
              v-for="item in flavorTexts"
              :key="item.version.name"
              :value="item.version.name"
            >
              {{ item.version.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="mt-8 rounded-lg bg-gray-300 py-4 px-4 md:row-start-1 md:mt-0">
        <h5 class="font-semibold">Stats</h5>
        <div class="mt-3">
          <PokemonStat
            v-for="item in response?.stats"
            :key="item.stat.name"
            :name="item.stat.name"
            :value="item.base_stat"
          />
        </div>
      </div>
    </div>

    <div class="my-10">
      <span class="text-sm font-semibold">Evolution</span>
      <div class="mx-auto mt-4 grid max-w-2xl grid-cols-3 gap-10">
        <div v-for="item in response?.evolution" :key="item.species.name">
          <EvolutionCard :evolution="item" />
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
