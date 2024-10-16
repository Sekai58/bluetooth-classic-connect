/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../utils/theme';
import SVG from '../../components/SVG';

const Base = ({
  children,
  title,
  padding,
}: {
  children: React.ReactNode;
  title: string;
  padding?: boolean;
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.black,
        flex: 1,
        padding: padding ? 16 : 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          padding: padding ? 0 : 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SVG
            source="back_arrow"
            width={24}
            height={24}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: theme.colors.white,
            fontFamily: 'Poppins',
            fontWeight: 'semibold',
            fontSize: 16,
          }}>
          {title}
        </Text>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default Base;
