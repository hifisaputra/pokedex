<script setup lang="ts">
defineProps<{
  value: number
  name: string
}>()
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
            :style="{ width: `${value}%` }"
            class="h-2 rounded-full bg-blue-400"
          ></div>
        </div>
        <span class="text-xs">{{ value }}/100</span>
      </div>
    </div>
  </div>
</template>
