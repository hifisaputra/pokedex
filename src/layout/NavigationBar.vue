<template>
  <div class="border-b bg-white py-4 shadow">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-6">
      <RouterLink :to="{ name: 'home' }" class="text-xl font-bold">
        Pokédex
      </RouterLink>

      <div>
        <RouterLink :to="{ name: 'favourites' }" class="font-semibold">
          Favourites
        </RouterLink>
      </div>
    </div>
  </div>
</template>
