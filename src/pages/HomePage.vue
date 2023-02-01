<script setup lang="ts">
import { onMounted } from "vue";
import { usePokemonTypeApi } from "../composable/api/pokemonTypeApi";

const { response, fetch } = usePokemonTypeApi();

onMounted(() => {
  fetch();
});
</script>

<template>
  <div>
    <div class="mx-auto max-w-5xl">
      <div>
        <h5>Types</h5>
        <div class="flex flex-wrap space-y-3 space-x-0">
          <a
            href=""
            v-for="item in response?.data.results"
            :key="item.name"
            class="rounded-lg bg-slate-300 px-4 py-0 capitalize"
          >
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
      <p>{{ response?.data }}</p>
    </div>
  </div>
</template>
