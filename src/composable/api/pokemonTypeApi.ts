import { reactive, toRefs } from 'vue'
import { RequestError, FetchResponse, apiCall } from '../../lib/axios'

export interface PokemonType {
  name: string
  url: string
}

export const useFetchType = () => {
  const result = reactive<{
    loading: boolean
    error: RequestError | null
    response: FetchResponse<PokemonType> | null
  }>({
    loading: false,
    error: null,
    response: null
  })

  const call = async () => {
    result.loading = true
    const { error, response } = await apiCall<FetchResponse<PokemonType>>({
      url: '/type',
      method: 'GET'
    })

    if (error) result.error = error
    if (response) result.response = response
  }

  return { ...toRefs(result), call }
}
