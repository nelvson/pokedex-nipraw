import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { ImageDetail, PaginationArrow } from '../../general/components';

import { PokemonList, RowsPerPage } from './hooks';

type ListProps = {
  id: string;
  name: string;
};

export default function List() {
  let [rowsPerPage, setRowsPerPage] = useState<RowsPerPage>(20);
  let [page, setPage] = useState(0);
  let [list, setList] = useState<Array<ListProps>>([]);
  let [isNextAvailable, setNextAvailable] = useState(true);
  let { isLoading, list: listQuery, error, next } = PokemonList({
    rowsPerPage,
    page,
  });

  useEffect(() => {
    if (listQuery && !isLoading) {
      setList(listQuery);
      if (!next) {
        setNextAvailable(false);
      }
    }
  }, [isLoading, listQuery]);

  if (isLoading && !error) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageDetailWrap}>
        {list.map((datum) => (
          <ImageDetail index={datum.id} name={datum.name} containerStyle={{flexWrap: 'wrap', flex: 1}} />
        ))}
      </View>

      <PaginationArrow
        rightOnPress={() => setPage(page + 1)}
        isLeftClickable={!(page === 0)}
        isRightClickable={isNextAvailable}
        leftOnPress={() => setPage(page - 1)}
      />
      <Text>List screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40
  },
  imageDetailWrap: {
    //
  },
});
