import { reactive, toRefs } from "vue";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 10000,
});

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ErrorType {
  error: string;
  message: string;
  statusCode: number;
}

export interface FetchResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

type Options = Pick<AxiosRequestConfig, "url" | "method" | "data" | "params">;

interface Result<K> {
  status: Status;
  response: null | AxiosResponse<K>;
  error: null | ErrorType;
}

export function useApi<T>() {
  const result = reactive<Result<T>>({
    status: Status.IDLE,
    error: null,
    response: null,
  });

  async function call({ url, method, data, params }: Options) {
    result.status = Status.LOADING;

    try {
      const requestResponse = await axiosInstance.request({
        url,
        method,
        data,
        params,
      });

      result.response = requestResponse;
      result.status = Status.SUCCESS;
    } catch (error) {
      const { response } = error as AxiosError;

      result.error = {
        error: response?.statusText || "",
        message: "",
        statusCode: response?.status || 500,
      };
      result.status = Status.ERROR;

      if (result.error?.statusCode === 500) {
        console.log("Something went wrong!");
      }
    }
  }

  return { ...toRefs(result), call };
}
