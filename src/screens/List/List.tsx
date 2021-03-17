import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { ImageDetail } from '../../general/components';

import { PokemonList } from './hooks';

type ListProps = {
  id: string;
  name: string;
};

export default function List() {
  let [rowsPerPage, setRowsPerPage] = useState<5 | 10 | 20>(5);
  let [page, setPage] = useState(0);
  let [list, setList] = useState<Array<ListProps>>([]);
  let { isLoading, list: listQuery, error } = PokemonList({
    rowsPerPage,
    page,
  });

  useEffect(() => {
    if (listQuery && !isLoading) {
      setList(listQuery);
    }
  }, [isLoading, listQuery]);

  if (isLoading && !error) {
    return <ActivityIndicator />;
  }
  console.log(list);
  return (
    <View style={styles.container}>
      {list.map((datum) => (
        <ImageDetail index={datum.id} name={datum.name} />
      ))}
      <Text>List screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
