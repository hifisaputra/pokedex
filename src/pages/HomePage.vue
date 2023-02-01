<script setup lang="ts">
import { ref } from 'vue'
import TypeFilter from '../components/TypeFilter.vue'

const filter = ref({
  types: []
})

const showFilterBar = ref(false)
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
            <span class="text-xs text-gray-500">Search Pokémon by types</span>
          </div>
          <a href="" @click.prevent="showFilterBar = false">
            <img src="/x-icon.svg" alt="Close Icon" class="w-6" />
          </a>
        </div>
        <TypeFilter v-model="filter.types" class="mt-4 mb-6" />
        <a
          href=""
          class="block w-full rounded-md bg-orange-600 py-3 text-center text-white hover:bg-orange-700"
          >Apply</a
        >
      </div>
    </div>
  </div>
</template>
