import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export type ImageDetailProps = {
  uri: string;
  name: string;
  weight: number;
};

export function ImageDetail(props: ImageDetailProps) {
  let { name, weight, uri } = props;

  return (
    <View style={styles.root}>
      <Image source={{ uri }} style={styles.image} />
      <Text>Name: {name}</Text>

      <Text>weight: {weight}</Text>
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
