import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { slicePokemonUrlToId } from '../../general/helpers';
import fetchAPI from '../../general/helpers/fetchAPI';

type Result<T> = {
  count: number;
  next: Nullable<string>;
  previous: Nullable<string>;
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

export type RowsPerPage =  | 10 | 20 | 50;

type Props = {
  rowsPerPage: RowsPerPage;
  page: number;
};

export function PokemonList(props: Props) {
  let { rowsPerPage, page } = props;
  let { data: pokemonQuery, isLoading, error } = useQuery<
    Result<PokemonQuery>,
    string
  >('', () => getPokemon(props));
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
    next: pokemonQuery?.next,
    isLoading,
    error,
  };
}
