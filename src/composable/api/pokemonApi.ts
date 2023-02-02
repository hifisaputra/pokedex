import { reactive, toRefs } from 'vue'
import { RequestError, FetchResponse, apiCall } from '../../lib/axios'
import { PokemonType } from './pokemonTypeApi'

export interface Pokemon {
  id?: number
  name: string
  url: string
  height?: number
  weight?: number
  sprites?: {
    front_default?: string
  }
  types?: {
    type: {
      name: string
    }
  }[]
  abilities?: {
    ability: {
      name: string
    }
  }[]
  moves?: {
    move: {
      name: string
    }
  }[]
  stats?: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
}

/**
 * @description Method to fetch the detailed pokemon data, given an array of Pokemon.
 * since the /pokemon endpoint only returns the pokemon name and url,
 * we need loop throung the results and send an API call
 * for each pokemon to different endpoint which is /pokemon/{id}
 * to get the image, name, id and other detail data.
 * we will only get the ones that are being displayed so that
 * the app does not run slow.
 *
 * @param {Pokemon} pokemons
 * @returns {Promise<Pokemon[]>}
 */
const fetchPokemonData = async (pokemons: Pokemon[]): Promise<Pokemon[]> => {
  const promises = pokemons.map((item) =>
    apiCall<Pokemon>({
      url: item.url,
      method: 'GET'
    })
  )

  const pokemonData = await Promise.all(promises)

  const data: Pokemon[] = []
  pokemonData.forEach(({ response }) => {
    if (response) data.push(response)
  })

  return data
}

/**
 * @description Vue composable to fetch list of pokemon data.
 */
export const useFetchPokemon = () => {
  const result = reactive<{
    loading: boolean
    error: RequestError | null
    response: FetchResponse<Pokemon> | null
  }>({
    loading: false,
    error: null,
    response: null
  })

  const call = async (limit = 10, offset = 0, types = '') => {
    console.log('call', limit, offset, result.loading)
    if (offset === 0 || !result.response) {
      result.response = {
        count: limit,
        next: '',
        previous: '',
        results: []
      }
    }

    result.loading = true
    if (types.length > 0) {
      // the types parameter has data, meaning user want to fetch pokemon with specified types.
      // since PokeAPI does not provide any means of filtering data in the /pokemon endpoint,
      // we need to use different endpoint to fetch pokemon data specified by its types
      // which is the /type/{id} endpoint.
      // but this endpoint only receive one type at a time, so when user selects more than one type
      // we need to make API call for each type and combine the result.
      //
      // Update: Changed to only filter with one type, with the current API it wont be possible to get the pokemon
      // with exact type specified by user if there are more than one types selected.
      // unless we fetch all of the pokemon data for each type result. And doing so would make the app unstable or slow
      // since when user selected 2 types the result can be between 150 to 250,
      // meaning we would be doing 150 to 250 request at one tinnee.
      const typeData = await apiCall<PokemonType>({ url: types })

      const data: Pokemon[] = []
      if (typeData.response) {
        typeData.response.pokemon?.forEach((pokemon) => {
          data.push(pokemon.pokemon)
        })
      }

      let paginated = data.splice(offset, limit)
      paginated = await fetchPokemonData(paginated)

      paginated.forEach((item) => {
        result.response?.results.push(item)
      })
      result.response.count = data.length
    } else {
      const { response } = await apiCall<FetchResponse<Pokemon>>({
        url: '/pokemon',
        method: 'GET',
        params: {
          limit,
          offset
        }
      })

      if (response) {
        response.results = await fetchPokemonData(response.results)
        result.response.count = response.count

        response.results.forEach((item) => {
          result.response?.results.push(item)
        })
      }
    }
    result.loading = false
  }

  return { ...toRefs(result), call }
}

/**
 * @description Vue composable to fetch the specified pokemon data
 */
export const useGetPokemon = () => {
  const result = reactive<{
    loading: boolean
    error: RequestError | null
    response: Pokemon | null
  }>({
    loading: false,
    error: null,
    response: null
  })

  const call = async (id: number | string) => {
    result.loading = true

    const { response } = await apiCall<Pokemon>({
      url: `/pokemon/${id}`,
      method: 'GET'
    })
    if (response) result.response = response
    result.loading = false
  }

  return { ...toRefs(result), call }
}
