import { useApi, FetchResponse } from "../useApi";

export interface PokemonType {
  name: string;
  url: string;
}

export const usePokemonTypeApi = () => {
  const { call, ...result } = useApi<FetchResponse<PokemonType>>();

  const fetch = () => {
    call({
      url: "/type",
      method: "GET",
    });
  };

  return { ...result, fetch };
};
