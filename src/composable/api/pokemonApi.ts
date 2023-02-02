import { reactive, toRefs } from 'vue'
import { RequestError, FetchResponse, apiCall } from '../../lib/axios'
import { PokemonType } from './pokemonTypeApi'

export interface Pokemon {
  id?: number
  name: string
  url: string
  sprites?: {
    front_default?: string
  }
  types?: {
    type: {
      name: string
    }
  }[]
}

// since the /pokemon endpoint only returns the pokemon name and url,
// we need loop throung the results and send an API call
// for each pokemon to different endpoint which is /pokemon/{id}
// to get the image, name, id and other detail data.
// we will only get the ones that are being displayed so that
// the app does not run slow.
const fetchPokemonData = async (pokemons: Pokemon[]) => {
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

  const call = async (limit = 10, offset = 0, types = []) => {
    result.loading = true

    if (types.length > 0) {
      // the types parameter has data, meaning user want to fetch pokemon with specified types.
      // since PokeAPI does not provide any means of filtering data in the /pokemon endpoint,
      // we need to use different endpoint to fetch pokemon data specified by its types
      // which is the /type/{id} endpoint.
      // but this endpoint only receive one type at a time, so when user selects more than one type
      // we need to make API call for each type and combine the result.
      const typeData = await Promise.all(
        types.map((item) => apiCall<PokemonType>({ url: item }))
      )

      let data: Pokemon[] = []
      typeData.forEach(async (item) => {
        if (item.response)
          item.response.pokemon?.forEach((pokemon) => {
            if (data.findIndex((i) => i.name === pokemon.pokemon.name) < 0)
              data.push(pokemon.pokemon)
          })
      })

      data = data.splice(offset, limit)
      data = await fetchPokemonData(data)

      result.response = {
        count: limit,
        next: '',
        previous: '',
        results: data
      }
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

        if(offset === 0) result.response = {
          count: limit,
          next: '',
          previous: '',
          results: []
        }

        result.response = response
      }
    }
    result.loading = false
  }

  return { ...toRefs(result), call }
}
