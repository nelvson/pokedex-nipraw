import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export type TagProps = {
  text: string;

  textColorProps?: string;
};

export function Tag(props: TagProps) {
  let {
    text,

    textColorProps,
  } = props;

  let wrapper = {
    borderWidth: 1,
    borderRadius: 16,
    height: 24,
  };

  return (
    <View style={wrapper}>
      <View style={styles.root}>
        <Text style={{ color: textColorProps || '#0f0f0f' }}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
