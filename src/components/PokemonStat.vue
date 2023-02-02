<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    value: number,
    name: string
}>()

const label = computed(() => {
    switch (props.name) {
        case 'hp':
            return 'HP'
        case 'attack':
            return 'ATK'
        case 'defense':
            return 'DEF'
        case 'special-attack':
            return 'S. ATK'
        case 'special-defense':
            return 'S. DEF'
        case 'speed':
            return 'SPD'
        default:
            return ''
    }
})

const roundedValue = computed(() => {
    return props.value / 10
})
</script>

<template>
    <div class="text-center">
        <div class="w-full">
            <div v-for="i in Array.from({length:10}, (v,k) => k+1)" :key="i" class="mb-1 border-b-8 w-full" :class="roundedValue <= i ? 'border-blue-600' : 'border-white-600'"></div>
        </div>
        <span :class="name.length <= 2 ? 'uppercase' : 'capitalize'" class="text-xs font-semibold">{{ label }}</span>
    </div>
</template>