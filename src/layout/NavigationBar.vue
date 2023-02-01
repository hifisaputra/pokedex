<template>
  <div class="bg-white py-4 shadow">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4">
      <RouterLink :to="{ name: 'home' }" class="text-xl font-bold">
        Pokédex
      </RouterLink>

      <div>
        <RouterLink
          :to="{ name: 'home' }"
          class="font-semibold hover:bg-red-600"
        >
          Favourites
        </RouterLink>
      </div>
    </div>
  </div>
</template>
