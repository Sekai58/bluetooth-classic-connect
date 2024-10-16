/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {type BottomTabBarProps} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import {Keyboard, Platform} from 'react-native';
import {AnimatedTabBarButton, CustomTabBarButton} from './TabBarButton';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../../utils/theme';

const StyledView = styled.View<any>`
  flex-direction: row;
  background-color: ${props =>
    !!props?.color
      ? props.theme.colors[props?.color]
      : props.theme.colors.white};
`;

const StyledPressable = styled.View<{paddingBottom?: number}>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 14px;
  padding-bottom: ${({paddingBottom}) => paddingBottom}px;
`;

const CustomTabBar = ({state, navigation}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <StyledView
        style={{
          display: keyboardVisible ? 'none' : 'flex',
          height: Platform.OS === 'ios' ? 45 + insets.bottom : 45 + 10,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
          backgroundColor: theme.colors.gray700,
          borderTopWidth: 1,
        }}>
        {state.routes.map((route, index) => {
          return (
            <StyledPressable key={index.toString()}>
              {index === Math.round(state.routes.length / 2) - 1 ? (
                <CustomTabBarButton
                  iconName="bluetooth"
                  handlePress={() => {
                    navigation.navigate(route.name);
                  }}
                />
              ) : (
                <AnimatedTabBarButton
                  iconName={route.name.toLowerCase()}
                  label={route.name}
                  isPressed={state.index === index}
                />
              )}
            </StyledPressable>
          );
        })}
      </StyledView>
    </>
  );
};

export default CustomTabBar;
