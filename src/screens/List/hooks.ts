import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { slicePokemonUrlToId } from '../../general/helpers';
import fetchAPI from '../../general/helpers/fetchAPI';

type Result<T> = {
  count: number;
  results: Array<T>;
};

type PokemonQuery = {
  name: string;
  url: string;
};

const getPokemon = async (props: Props) => {
  let { rowsPerPage, page } = props;
  return fetchAPI(`pokemon?limit=${rowsPerPage}&offset=${page * rowsPerPage}`);
};

type Props = {
  rowsPerPage: 5 | 10 | 20;
  page: number;
};

export function PokemonList(props: Props) {
  let { data: pokemonQuery, isLoading, error } = useQuery<
    Result<PokemonQuery>,
    string
  >('results', () => getPokemon(props));

  let list = useMemo(() => {
    return (
      pokemonQuery?.results.map(({ name, url }) => {
        return {
          name,
          id: slicePokemonUrlToId(url),
        };
      }) || []
    );
  }, [pokemonQuery]);

  return {
    list,
    isLoading,
    error,
  };
}
