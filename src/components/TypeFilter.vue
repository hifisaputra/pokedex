<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useFetchType } from '../composable/api/pokemonTypeApi'
import TypePill from './TypePill.vue'

const props = defineProps<{
  class?: string
  modelValue?: string[]
}>()

const { response, call } = useFetchType()

onMounted(() => {
  call()
})

const cssClass = computed(() => props.class)

const emit = defineEmits(['update:modelValue'])

const onClick = (name: string) => {
  console.log('onclick', name)
  let activeTypes = props.modelValue as string[]

  if (activeTypes.includes(name)) {
    activeTypes = activeTypes.filter((i) => i !== name)
  } else {
    activeTypes.push(name)
  }

  emit('update:modelValue', activeTypes)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2" :class="cssClass">
    <TypePill
      v-for="item in response?.results"
      @click="() => onClick(item.name)"
      :key="item.name"
      :name="item.name"
      size="big"
      :active="props.modelValue?.includes(item.name)"
    />
  </div>
</template>
