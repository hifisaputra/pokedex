<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { PokemonType, useFetchType } from '../composable/api/pokemonTypeApi'
import TypePill from './TypePill.vue'

const props = defineProps<{
  class?: string
  modelValue?: string
}>()

const { response, call } = useFetchType()

onMounted(() => {
  call()
})

const cssClass = computed(() => props.class)

const emit = defineEmits(['update:modelValue'])

const onClick = (item: PokemonType) => {
  emit('update:modelValue', item.url)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2" :class="cssClass">
    <TypePill
      v-for="item in response?.results"
      @click="() => onClick(item)"
      :key="item.name"
      :name="item.name"
      size="big"
      :active="props.modelValue === item.url"
    />
  </div>
</template>
