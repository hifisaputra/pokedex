import { reactive, toRefs } from 'vue'
import { RequestError, FetchResponse, apiCall } from '../../lib/axios'

export interface Pokemon {
  id?: number
  name: string
  url: string
  sprites: {
    front_default?: string
  }
  types: {
    type: {
      name: string
    }
  }[]
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
    const { error, response } = await apiCall<FetchResponse<Pokemon>>({
      url: '/pokemon',
      method: 'GET',
      params: {
        limit,
        offset
      }
    })

    // since the /pokemon endpoint only returns the pokemon name and url,
    // we need loop throung the results and send an API call
    // for each pokemon to different endpoint /pokemon/{id}
    // to get the image, name, id and other detail data.
    // we will only get the ones that are being displayed so that
    // the app does not run slow.
    if (response) {
      const promises = response.results.map((item) =>
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
      response.results = data

      result.response = response
    }
    result.loading = false

    if (error) result.error = error
  }

  return { ...toRefs(result), call }
}
