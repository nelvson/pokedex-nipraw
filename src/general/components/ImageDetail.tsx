import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { IMAGE_URL } from '../constants/api';

export type ImageDetailProps = {
  index: string;
  name: string;
  weight?: number;
};

export function ImageDetail(props: ImageDetailProps) {
  let { name, weight, index } = props;
  const uri =`${IMAGE_URL}` + index + '.png' 
  return (
    <View style={styles.root}>
      <Image source={{ uri }} style={styles.image} />
      <Text>Name: {name}</Text>

      {weight && <Text>weight: {weight}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    height: 200
  },
  image: {
    width: 100,
    height: 100,
  },
});
