import { useMemo } from 'react';
import { useQuery } from 'react-query';

import fetchAPI from '../../general/helpers/fetchAPI';
import { DetailResult } from '../Detail/hooks';

const getPokemon = async (ids: Array<string>) => {
  let res = Promise.all(
    ids.map(async (id) => {
      if (id === '') return {};
      return fetchAPI(`pokemon/${id}`);
    }),
  );

  return res;
};

export function DetailPokemon(ids: Array<string>) {
  let { data: pokemonQuery, isLoading, error } = useQuery<
    Array<DetailResult>,
    any
  >(ids, () => getPokemon(ids));

  let detail = useMemo(() => {
    return pokemonQuery;
  }, [pokemonQuery]);

  return {
    detail,
    isLoading,
    error,
  };
}
