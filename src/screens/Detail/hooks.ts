import { useMemo } from 'react';
import { useQuery } from 'react-query';

import fetchAPI from '../../general/helpers/fetchAPI';

export type PokemonStats = Array<{
  base_stat: number;
  effort: number;
  stat: BasicInformation;
}>;

export type DetailResult = {
  name: string;
  id: string;
  weight: number;
  order: number;
  height: number;
  abilities: Array<{
    ability: BasicInformation;
    is_hidden: boolean;
    slot: number;
  }>;
  forms: Array<BasicInformation>;
  stats: PokemonStats;
  moves: Array<{
    move: BasicInformation;
  }>;
  types: Array<{
    slot: number;
    type: BasicInformation;
  }>;
};

export type BasicInformation = {
  name: string;
  url: string;
};

const getPokemon = async (id: string) => fetchAPI(`pokemon/${id}`);

export function DetailPokemon(id: string) {
  let { data: pokemonQuery, isLoading, error } = useQuery<DetailResult, any>(
    '',
    () => getPokemon(id),
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
