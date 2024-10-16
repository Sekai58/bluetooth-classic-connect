import {theme} from '../utils/theme';
import {fontRegular12} from '../utils/font';
import {Animated} from 'react-native';
import styled from 'styled-components';
import React from 'react';

interface MaterialLabelProps {
  label: string;
  animatedIsFocused: any;
  isFocus: boolean;
  value: any;
}
const AnimatedLabel = ({
  label,
  animatedIsFocused,
  isFocus,
  value,
}: MaterialLabelProps) => {
  return (
    <StyleAnimatedText
      isFocus={!!value ? true : isFocus}
      style={[
        fontRegular12,
        {
          top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: !!value ? [-10, -10] : [13, -10],
          }),
          zIndex: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: !!value ? [11, 11] : [-1, 11],
          }),
          backgroundColor: theme.colors.black,
          paddingHorizontal: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: !!value ? [5, 5] : [0, 5],
          }),
        },
      ]}>
      {label}
    </StyleAnimatedText>
  );
};

export default AnimatedLabel;

const StyleAnimatedText = styled(Animated.Text)<any>`
  color: ${props =>
    !!props.isFocus
      ? props.theme.colors.brightBlue
      : props.theme.colors.gray200};
  position: absolute;
  left: 15px;
`;
