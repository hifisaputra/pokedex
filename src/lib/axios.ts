import axios, { AxiosRequestConfig, AxiosError } from 'axios'

export const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000
})

export interface RequestError {
  error: string
  message: string
  statusCode: number
}

export interface Result<R> {
  response?: R
  error?: RequestError
}

export interface FetchResponse<T> {
  count: number
  next: string
  previous: string
  results: T[]
}

type Options = Pick<AxiosRequestConfig, 'url' | 'method' | 'data' | 'params'>

export const apiCall = async <R>({ url, method, data, params }: Options) => {
  const result: Result<R> = {}
  try {
    const response = await instance.request({
      url,
      method,
      data,
      params
    })
    if (response.status === 200) result.response = response.data
  } catch (error) {
    const { response } = error as AxiosError
    result.error = {
      error: response?.statusText || '',
      message: '',
      statusCode: response?.status || 500
    }
  }

  return result
}
