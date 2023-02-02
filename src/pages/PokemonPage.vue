<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGetPokemon } from '../composable/api/pokemonApi'
import PokemonStat from '../components/PokemonStat.vue'
import TypePill from '../components/TypePill.vue'

const route = useRoute()
const { response, call } = useGetPokemon()

onMounted(() => {
  call(route.params.id as string)
})
</script>

<template>
  <div class="mx-auto max-w-5xl py-10 px-4">
    <div class="flex ">
      <div class="mr-4 ">
        <img class="bg-gray-200 py-4 px-4 rounded-lg" :src="response?.sprites?.front_default" alt="" />
      </div>
      <div>
        <h5 class="text-2xl font-bold capitalize">
          {{ response?.name }}
          <span class="text-base text-gray-500"
            >#{{ ('000' + response?.id).slice(-4) }}</span
          >
        </h5>

        <div class="mt-4">
          <div class="flex flex-wrap mt-2">
            <TypePill v-for="item in response?.types" :key="item.type.name" :name="item.type.name" class="mr-2" />
          </div>
        </div>

        <div class="mt-4">
          <a href="" class="text-sm px-4 py-2 bg-orange-600 text-white rounded-md">Favourite</a>
        </div>

      </div>
    </div>

    <div class="mt-10 bg-gray-400 py-4 px-4 rounded-lg">
      <h5>Stats</h5>
      <div class="grid grid-cols-6 gap-2 mt-3">
        <PokemonStat v-for="item in response?.stats" :key="item.stat.name" :name="item.stat.name" :value="item.base_stat" />
      </div>
    </div>

    <div class="mt-10">
      <span class="font-semibold text-sm">Abilities</span> <br>
      <ul class="list-disc pl-6">
        <li v-for="item in response?.abilities" :key="item.ability.name" class="capitalize text-sm">
          {{ item.ability.name }}
        </li>
      </ul>
    </div>
    <div class="mt-10">
      <span class="font-semibold text-sm">Moves</span> <br>
      <ul class="list-disc pl-6 grid grid-cols-2">
        <li v-for="item in response?.moves" :key="item.move.name" class="capitalize text-sm">
          {{ item.move.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
