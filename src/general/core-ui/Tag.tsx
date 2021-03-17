import React from 'react';
import { View, StyleSheet, Text, ViewStyle, StyleProp } from 'react-native';

export type TagProps = {
  text: string;
  customColor?: string;
  withDot?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Tag(props: TagProps) {
  let { text, customColor, withDot, containerStyle } = props;

  return (
    <View
      style={[styles.wrapper, { borderColor: customColor }, containerStyle]}
    >
      <View style={styles.root}>
        {withDot && (
          <View
            style={[
              styles.withDot,
              { backgroundColor: customColor, borderColor: customColor },
            ]}
          />
        )}
        <Text style={{ color: '#0f0f0f' }}>{text}</Text>
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
  wrapper: {
    borderWidth: 1,
    borderRadius: 16,
    height: 24,
  },
  withDot: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
});
