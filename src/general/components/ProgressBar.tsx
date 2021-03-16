import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';

import { PROGRESS_BAR } from '../constants/colors';
import { fontSizes } from '../constants/font';

type Props = {
  progressValue: number;
  text?: string;
  barColor?: string;
  withAnimation?: boolean;
  height?: number;
};

export { Props as ProgressBarProps };

export function ProgressBar(props: Props) {
  let {
    barColor = '#00A896',
    progressValue,
    height = 30,
    text,
    withAnimation = false,
  } = props;

  //change from decimal to percentage
  progressValue = progressValue >= 1 ? 100 : progressValue * 100;

  let animation = useRef(new Animated.Value(0));

  useEffect(() => {
    if (withAnimation) {
      Animated.timing(animation.current, {
        useNativeDriver: false,
        toValue: progressValue,
        duration: 500,
      }).start();
    }
  }, [progressValue, withAnimation]);

  const width = withAnimation
    ? animation.current.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
    : `${progressValue}%`;

  return (
    <View style={[styles.progressBar, { height }]}>
      <Animated.View
        style={[
          styles.absoluteFill,
          {
            backgroundColor: barColor,
            width,
          },
        ]}
      >
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: { width: '100%' },
  absoluteFill: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  text: {
    color: PROGRESS_BAR.TEXT,
    fontSize: fontSizes.xs,
  },
});
