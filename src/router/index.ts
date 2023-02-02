import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: () => import('../pages/PokemonPage.vue')
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('../pages/FavouritesPage.vue')
    }
  ]
})

export default router
