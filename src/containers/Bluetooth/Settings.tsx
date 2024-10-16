/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import React from 'react';
import {fontMedium12, fontMedium16, fontMedium24} from '../../utils/font';
import {theme} from '../../utils/theme';
import {SpacerColumn} from '../../components/Spacer/SpacerColumn';
import SVG from '../../components/SVG';
import styled from 'styled-components/native';

const Settings = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: theme.colors.black, flex: 1}}>
      <ScrollView style={{paddingVertical: 16}}>
        <Wrapper>
          <Text style={[fontMedium24, {color: theme.colors.white}]}>
            Connected Devices
          </Text>
        </Wrapper>
        <SpacerColumn size={4} />
        <Pressable
          android_ripple={{color: theme.colors.rippleColor}}
          style={pressed => [
            pressed && Platform.OS === 'ios'
              ? {backgroundColor: theme.colors.rippleColor}
              : {},

            {
              paddingVertical: 12,
              paddingHorizontal: 16,
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
            },
          ]}
          onPress={() => navigation.navigate('Scan')}>
          <SVG
            source="plus"
            width={20}
            height={20}
            color={theme.colors.gray50}
          />
          <Text style={[fontMedium16, {color: theme.colors.gray50}]}>
            Pair new device
          </Text>
        </Pressable>
        <SpacerColumn size={2} />
        <Wrapper>
          <Text style={[fontMedium12, {color: theme.colors.gray100}]}>
            Connected Devices
          </Text>
        </Wrapper>
        <SpacerColumn size={1} />
        <SpacerColumn size={0.125} backgroundColor="gray700" />
        <SpacerColumn size={2} />
        <Wrapper>
          <Text style={[fontMedium12, {color: theme.colors.gray100}]}>
            Saved Devices
          </Text>
        </Wrapper>
        <SpacerColumn size={1} />
        <SpacerColumn size={0.125} backgroundColor="gray700" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const Wrapper = styled.View`
  padding-horizontal: 16px;
`;
