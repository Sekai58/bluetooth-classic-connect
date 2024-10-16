/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import SVG from '../../components/SVG';
import {SpacerColumn} from '../../components/Spacer/SpacerColumn';
import {theme} from '../../utils/theme';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BClassic = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.black,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}>
      <View
        style={{
          backgroundColor: theme.colors.gray400,
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={{
              flex: 1,
              borderRightWidth: 1,
              borderColor: theme.colors.gray300,
              paddingVertical: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('BClassicServer');
            }}>
            <SVG
              source={'server'}
              width={20}
              height={20}
              color={theme.colors.gray50}
            />
            <SpacerColumn size={1} />
            <Text style={{color: theme.colors.white}}>Server</Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              borderLeftWidth: 1,
              borderColor: theme.colors.gray300,
              paddingVertical: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('BClassicClient');
            }}>
            <SVG
              source={'client'}
              width={20}
              height={20}
              color={theme.colors.gray50}
            />
            <SpacerColumn size={1} />
            <Text style={{color: theme.colors.white}}>Client</Text>
          </Pressable>
        </View>
      </View>
      <SpacerColumn size={1} />
    </SafeAreaView>
  );
};

export default BClassic;
