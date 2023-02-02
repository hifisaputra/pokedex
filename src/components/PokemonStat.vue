<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  value: number
  name: string
}>()
const valueInPercent = computed(() => {
  return (props.value / 255) * 100
})
</script>

<template>
  <div class="mb-2">
    <div class="grid grid-cols-10 items-center gap-2">
      <span
        :class="name.length <= 2 ? 'uppercase' : 'capitalize'"
        class="col-span-4 text-left text-sm font-semibold"
        >{{ name.replace('-', ' ') }}</span
      >
      <div class="col-span-6 block text-right">
        <div class="h-2 rounded-full bg-gray-700">
          <div
            :style="{ width: `${valueInPercent}%` }"
            class="h-2 rounded-full bg-blue-400"
          ></div>
        </div>
        <span class="text-xs">{{ value }}/255</span>
      </div>
    </div>
  </div>
</template>
