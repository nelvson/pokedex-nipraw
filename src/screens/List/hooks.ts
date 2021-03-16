import { useMemo } from 'react';
import { useQuery } from 'react-query';

import fetchAPI from '../../general/helpers/fetchAPI';

type Result<T> = {
  count: number;
  results: Array<T>;
};

type PokemonQuery = {
  name: string;
  url: string;
};

const getPokemon = async () => fetchAPI('pokemon?limit=5&offset=10&order=1');

export function Pokemon() {
  let { data: pokemonQuery, isLoading } = useQuery<Result<PokemonQuery>>(
    'results',
    getPokemon,
  );

  let list = useMemo(() => {
    return pokemonQuery?.results.map((datum) => {
      return datum;
    });
  }, [pokemonQuery]);

  return {
    list,
    isLoading,
  };
}
