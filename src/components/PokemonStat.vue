<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
  name: string
}>()

const roundedValue = computed(() => {
  return props.value / 10
})
</script>

<template>
  <div class="mb-2">
    <div class="grid grid-cols-10 gap-2 items-center">
        <span :class="name.length <= 2 ? 'uppercase' : 'capitalize'" class="col-span-4 text-left text-sm font-semibold">{{ name.replace('-', ' ') }}</span>
        <div class="col-span-6 block text-right">
            <div class=" bg-gray-700 h-2 rounded-full">
                <div :style="{ width: `${value}%`}" class="h-2 rounded-full bg-blue-400"></div>
            </div>
            <span class="text-xs">{{ value }}/100</span>
        </div>
    </div>
  </div>
</template>
