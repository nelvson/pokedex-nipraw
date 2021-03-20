import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useLocation } from 'react-router';

import { ImageDetail, PaginationArrow } from '../../general/components';
import { slicePokemonUrlToId } from '../../general/helpers';
import { CheckBox } from '../../general/core-ui';

import { DetailMoveType, MoveName, MoveResult, TypeName, TypeResult } from './hooks';
import { BasicInformation } from '../Detail/hooks';

type PokemonType = '' | 'TYPE' | 'MOVE';

export default function Filter() {
  let locationState = useLocation().state as Maybe<{
    type: PokemonType;
    id: string;
  }>;
  let [modalBaseProps, setModalBaseProps] = useState<{
    id: string;
    type: PokemonType;
  }>({ id: '0', type: '' });
  let [list, setList] = useState<TypeResult | MoveResult>();
  let [isMounted, setMounted] = useState(false);
  let [page, setPage] = useState(0);
  let [pokemonList, setPokemonList] = useState<Array<BasicInformation>>([]);
  let [flagPokemonList, setFlagPokemonList] = useState(false);

  let {
    error: errorMoveNameList,
    isLoading: isLoadingMoveNameList,
    list: moveNameList,
  } = MoveName(
    !isMounted
      ? locationState?.id || '0'
      : (modalBaseProps.id as string) || '0',
  );

  let {
    error: errorTypeNameList,
    isLoading: isLoadingTypeNameList,
    list: typeNameList,
  } = TypeName(
    !isMounted
      ? locationState?.id || '0'
      : (modalBaseProps.id as string) || '0',
  )

  let { detail, isLoading, error } = DetailMoveType(
    !isMounted ? locationState?.id || '' : (modalBaseProps?.id as string),
    !isMounted
      ? (locationState?.type as 'TYPE' | 'MOVE')
      : (modalBaseProps?.type as 'TYPE' | 'MOVE'),
  );

  useEffect(() => {
    function mountState() {
      if (locationState && !isMounted) {
        setModalBaseProps({
          id: locationState.id,
          type: locationState.type,
        });
      }
    }
    function fetchQuery() {
      if (detail && !isLoading) {
        setList(detail);
        setFlagPokemonList(false);
      }
      if (!moveNameList && !isLoadingMoveNameList) {
        //
      }
    }

    mountState();
    fetchQuery();
    setMounted(true);
  }, [locationState, detail]);

  if (isLoading && !error && isLoadingMoveNameList && !errorMoveNameList) {
    return <ActivityIndicator />;
  }

  if (list === undefined && !isLoading) {
    return <Text>empty</Text>;
  }

  if (!flagPokemonList && list && !isLoading) {
    if (modalBaseProps.type === 'TYPE' && (list as TypeResult).pokemon) {
      let slicedArr = (list as TypeResult).pokemon.slice(page, 5);
      let newPokemonList = slicedArr.map(({ pokemon }) => {
        return pokemon;
      });
      setPokemonList(newPokemonList);
      setFlagPokemonList(true);
    } else if (
      modalBaseProps.type === 'MOVE' &&
      (list as MoveResult).learned_by_pokemon
    ) {
      let slicedArr = (list as MoveResult).learned_by_pokemon.slice(page, 5);
      setPokemonList(slicedArr);
      setFlagPokemonList(true);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Type</Text>
        <>
          {typeNameList.map((datum) => {
            return (
              <CheckBox
                checked={
                  modalBaseProps.type === 'TYPE' &&
                  (Number(datum.id) - 1).toString() === modalBaseProps.id
                }
                label={datum.name.toString()}
                onChange={async () => {
                  setModalBaseProps({
                    id: (Number(datum.id) - 1).toString(),
                    type: 'TYPE',
                  });
                }}
              />
            );
          })}
        </>

        <Text>Move</Text>
        <>
          {moveNameList.map((datum) => {
            return (
              <CheckBox
                checked={
                  modalBaseProps.type === 'MOVE' &&
                  (Number(datum.id) - 1).toString() === modalBaseProps.id
                }
                label={datum.name.toString()}
                onChange={async () => {
                  setModalBaseProps({
                    id: (Number(datum.id) - 1).toString(),
                    type: 'MOVE',
                  });
                }}
              />
            );
          })}
        </>

      </View>

      <View style={styles.imageDetailWrap}>
        {pokemonList.map((datum) => (
          <ImageDetail
            index={slicePokemonUrlToId(datum.url)}
            name={datum.name}
          />
        ))}
      </View>

      <PaginationArrow
        rightOnPress={() => setPage(page + 1)}
        isLeftClickable={!(page === 0)}
        leftOnPress={() => setPage(page - 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  imageDetailWrap: {
    //
  },
});
