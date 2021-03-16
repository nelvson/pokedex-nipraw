import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

type Props = {
  progressValue: number;
  barColor?: string;
  withAnimation?: boolean;
  height?: number;
};

export { Props as ProgressBarProps };

export function ProgressBar(props: Props) {
  let {
    barColor = '#00A896',
    progressValue,
    height = 10,
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: { width: '100%' },
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})
