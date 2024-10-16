/* eslint-disable react-native/no-inline-styles */
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../utils/theme';
import {Dimensions, View} from 'react-native';
import SVG from './SVG';
import styled from 'styled-components/native';
import React from 'react';

const {width} = Dimensions.get('window');

const ScanButton = ({startScan}: {startScan: any}) => {
  return (
    <View
      style={{
        width: width / 3 + 120,
        height: width / 3 + 120,
        backgroundColor: 'rgba(25,243,255,0.1)',
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
      }}>
      <View
        style={{
          borderRadius: 999,
          flex: 1,
          width: '100%',
          backgroundColor: theme.colors.black,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            borderRadius: 999,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.brightBlue,
            borderStyle: 'dashed',
            padding: 10,
          }}>
          <View
            style={{
              borderRadius: 999,
              flex: 1,
              width: '100%',
              backgroundColor: theme.colors.black,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <StyledTouchableOpacity activeOpacity={0.5} onPress={startScan}>
              <LinearGradient
                colors={[theme.colors.brightBlue, theme.colors.blue300]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  flex: 1,
                  width: '100%',
                  borderRadius: 999,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SVG
                  source="power"
                  width={52}
                  height={52}
                  color={theme.colors.gray500}
                />
              </LinearGradient>
            </StyledTouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: ${theme.colors.brightBlue};
  margin-horizontal: 24px;
  width: ${width / 3 + 20}px;
  height: ${width / 3 + 20}px;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
`;

export default ScanButton;
