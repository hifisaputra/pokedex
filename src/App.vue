<script setup lang="ts">
import { useRoute } from 'vue-router'
import NavigationBar from './layout/NavigationBar.vue'

const route = useRoute()
</script>

<template>
  <main>
    <NavigationBar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>
