import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';

type Props = {
  isLeftClickable?: boolean;
  leftOnPress?: () => void;
  isRightClickable?: boolean;
  rightOnPress?: () => void;
};

export function PaginationArrow(props: Props) {
  let {
    rightOnPress,
    leftOnPress,
    isLeftClickable = true,
    isRightClickable = true,
  } = props;
  return (
    <View style={styles.root}>
      <TouchableOpacity disabled={!isLeftClickable} onPress={leftOnPress}>
        <ArrowBackIos color={!isLeftClickable ? 'disabled' : 'inherit'} />
      </TouchableOpacity>

      <TouchableOpacity disabled={!isRightClickable} onPress={rightOnPress}>
        <ArrowForwardIos color={!isRightClickable ? 'disabled' : 'inherit'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
});
