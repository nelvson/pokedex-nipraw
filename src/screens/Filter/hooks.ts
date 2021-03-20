import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { slicePokemonUrlToId } from '../../general/helpers';

import fetchAPI from '../../general/helpers/fetchAPI';
import { BasicInformation } from '../Detail/hooks';
import { ListResult } from '../List/hooks';

const getType = async (id: string) => fetchAPI(`type/${id}`);
const getMove = async (id: string) => fetchAPI(`move/${id}`);
const getMoveName = async (id: string) => fetchAPI(`move?offset=${id}&limit=3`);
const getTypeName = async (id: string) => fetchAPI(`type?offset=${id}&limit=3`);

export type TypeResult = {
  name: string;
  id: number;
  damage_relations: {};
  pokemon: Array<{
    slot: number;
    pokemon: BasicInformation;
  }>;
  move_damage_class: BasicInformation;
};

export type MoveResult = {
  name: string;
  id: number;
  learned_by_pokemon: Array<BasicInformation>;
};

export function DetailMoveType(id: string, type: 'TYPE' | 'MOVE') {
  let func = type === 'TYPE' ? () => getType(id) : () => getMove(id);

  type ResType = typeof type extends 'TYPE' ? TypeResult : MoveResult;
  let { data: typeQuery, isLoading, error, refetch } = useQuery<ResType, any>(
    [id, type],
    func,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: 'always',
    },
  );

  let detail = useMemo(() => {
    return typeQuery;
  }, [typeQuery]);

  return {
    detail,
    isLoading,
    error,
    refetch,
  };
}

export function MoveName(id: string) {
  let { data: moveNameList, isLoading, error } = useQuery<
    ListResult<BasicInformation>,
    any
  >(id, () => getMoveName(id));
  let list = useMemo(() => {
    return (
      moveNameList?.results.map(({ name, url }) => {
        return {
          name,
          id: slicePokemonUrlToId(url, 31),
        };
      }) || []
    );
  }, [moveNameList]);
  return {
    list,
    isLoading,
    error,
  };
}

export function TypeName(id: string) {
  let { data: typeNameList, isLoading, error } = useQuery<
    ListResult<BasicInformation>,
    any
  >(id, () => getTypeName(id));
  let list = useMemo(() => {
    return (
      typeNameList?.results.map(({ name, url }) => {
        return {
          name,
          id: slicePokemonUrlToId(url, 31),
        };
      }) || []
    );
  }, [typeNameList]);

  return {
    list,
    isLoading,
    error,
  };
}
