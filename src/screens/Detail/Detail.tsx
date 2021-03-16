import React from 'react';
import { useParams } from 'react-router-dom';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { DetailPokemon } from './hooks';
import { Tag } from '../../general/core-ui';
import { ImageDetail } from '../../general/components';
import { IMAGE_URL } from '../../general/constants/api';

type DetailRoute = {
  id: string;
};

export default function Detail() {
  let { id } = useParams() as DetailRoute;

  let { isLoading, detail, error } = DetailPokemon(id);

  console.log(isLoading, error, detail);

  if (error) {
    return <Text>ERROR</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.tagDetail}>
        <Tag text="asd" />
      </View>
      <View style={styles.pokemonDetail}>
        <ImageDetail
          uri={`${IMAGE_URL}` + id + '.png'}
          name="asd"
          weight={30}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row'
  },
  tagDetail: {
    flex: 3,
  },
  pokemonDetail: {
    flex: 1,
  },
});
