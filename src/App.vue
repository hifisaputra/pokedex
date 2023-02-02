<script setup lang="ts">
import NavigationBar from './layout/NavigationBar.vue'
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
