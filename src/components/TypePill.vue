<script setup lang="ts">
import { computed } from 'vue'

type Size = 'small' | 'big'

const props = defineProps<{
  class?: string
  active?: boolean
  name: string
  onClick?: () => void
  size?: Size
}>()

const cssClass = computed(() => props.class)

const getTypeBgColor = (type: string) => {
  if (props.active) return 'bg-orange-600 text-white'
  switch (type) {
    case 'bug':
      return 'bg-[#729f3f] text-white'
    case 'dark':
      return 'bg-[#707070] text-white'
    case 'dragon':
      return 'bg-dragon text-white'
    case 'electric':
      return 'bg-[#eed535] text-gray-800'
    case 'fairy':
      return 'bg-[#fdb9e9] text-gray-800'
    case 'fighting':
      return 'bg-[#d56723] text-white'
    case 'fire':
      return 'bg-[#fd7d24] text-white'
    case 'flying':
      return 'bg-flying text-gray-800'
    case 'ghost':
      return 'bg-[#7b62a3] text-white'
    case 'grass':
      return 'bg-[#9bcc50] text-white'
    case 'ground':
      return 'bg-ground text-gray-800'
    case 'ice':
      return 'bg-[#51c4e7] text-gray-800'
    case 'poison':
      return 'bg-[#b97fc9] text-white'
    case 'psychic':
      return 'bg-[#f366b9] text-white'
    case 'rock':
      return 'bg-[#a38c21] text-white'
    case 'steel':
      return 'bg-[#9eb7b8] text-gray-800'
    case 'water':
      return 'bg-[#4592c4] text-white'
    default:
      return 'bg-[#a4acaf] text-white'
  }
}

const getSize = () => {
  if (props.size === 'big') return 'rounded-md px-4 py-2 text-sm '

  return 'rounded-sm px-2 py-0 text-xs '
}
</script>

<template>
  <a
    href="#"
    @click.prevent="onClick"
    :class="`${getTypeBgColor(name)} ${cssClass} ${getSize()}`"
    class="text-center capitalize"
  >
    <span>{{ name }}</span>
  </a>
</template>

<style scoped>
.bg-dragon {
  background: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%);
}
.bg-flying {
  background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);
}
.bg-ground {
  background: linear-gradient(180deg, #f7de3f 50%, #ab9842 50%);
}
</style>
