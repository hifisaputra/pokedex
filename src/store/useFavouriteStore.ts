import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Pokemon } from '../composable/api/pokemonApi'
import { writeToStorage, readFromStorage } from '../lib/localStorage'

/**
 * @description Store to save all of user's favourite pokemon data.
 * Since we don't have backend to store all the data,
 * we will use local storate instead.
 * The data will be saved in JSON format.
 */
export const useFavouriteStore = defineStore('favourites', () => {
  const favourites = ref<Pokemon[]>([])

  function toggleFavourite(pokemon: Pokemon) {
    const itemIndex = favourites.value.findIndex(
      (item) => item.name === pokemon.name
    )
    if (itemIndex >= 0) {
      favourites.value.splice(itemIndex, 1)
    } else {
      const { id, name, url, sprites, stats, types, abilities, moves } = pokemon
      favourites.value.push({
        id,
        name,
        url,
        sprites,
        stats,
        types,
        abilities,
        moves
      })
    }

    writeToStorage('favourites', JSON.stringify(favourites.value))
  }

  function fetchFavourites() {
    const jsonString = readFromStorage('favourites')
    if (!jsonString) return

    const data = JSON.parse(jsonString) as Pokemon[]
    favourites.value = data
  }

  return { favourites, toggleFavourite, fetchFavourites }
})
