import { useMemo } from 'react';
import { useQuery } from 'react-query';

import fetchAPI from '../../general/helpers/fetchAPI';

type Result = {
  name: string;
  weight: number;
  order: number;
  height: number;
  abilities: Array<{
    ability: BasicInformation;
    is_hidden: boolean;
    slot: number;
  }>;
  forms: Array<BasicInformation>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: BasicInformation;
  }>;
  moves: Array<{
    move: BasicInformation;
  }>;
  types: Array<{
    slot: number;
    type: BasicInformation;
  }>;
};

export { Result as DetailResult };

type BasicInformation = {
  name: string;
  url: string;
};

const getPokemon = async (id: string) => fetchAPI(`pokemon/${id}`);

export function DetailPokemon(id: string) {
  let { data: pokemonQuery, isLoading, error } = useQuery<Result, any>('', () =>
    getPokemon(id),
  );

  let detail = useMemo(() => {
    return pokemonQuery;
  }, [pokemonQuery]);

  return {
    detail,
    isLoading,
    error,
  };
}
