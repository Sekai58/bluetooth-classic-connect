import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {theme} from '../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import SVG from './SVG';

const {width} = Dimensions.get('window');

const RippleEffect = () => {
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);
  const textScaleValue = useSharedValue(0.4);

  const animatedCircle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleValue.value}],
      opacity: opacityValue.value,
    };
  });

  //   const animatedTextStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [{scale: textScaleValue.value}],
  //     };
  //   });

  const startRippleAnimation = () => {
    scaleValue.value = withRepeat(withTiming(3, {duration: 1000}), -1);
    opacityValue.value = withRepeat(withTiming(0, {duration: 1000}), -1);
    textScaleValue.value = withRepeat(withTiming(1, {duration: 1000}), -1);
  };

  useEffect(() => {
    startRippleAnimation();
  }, []);

  return (
    <View style={styles.rippleView}>
      <View style={[styles.circle]}>
        <Animated.View style={[animatedCircle, styles.innerCircle]} />
        <LinearGradient
          colors={[theme.colors.brightBlue, theme.colors.blue300]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={[styles.innerView]}>
          <View>
            <SVG
              source="power"
              width={52}
              height={52}
              color={theme.colors.gray500}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default RippleEffect;

const styles = StyleSheet.create({
  rippleView: {
    width: width / 3,
    height: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: width / 3 + 30,
    height: width / 3 + 30,
    borderRadius: 999,
    backgroundColor: theme.colors.blue600,
  },
  innerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: theme.colors.brightBlue,
    justifyContent: 'center',
  },
  innerView: {
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    backgroundColor: 'blue',
    width: width / 3 + 30,
    height: width / 3 + 30,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
