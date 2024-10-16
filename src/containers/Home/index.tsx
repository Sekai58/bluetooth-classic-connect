/* eslint-disable react-native/no-inline-styles */
import {Dimensions, ImageBackground, Text} from 'react-native';
import {theme} from '../../utils/theme';
import SearchInput from '../../components/Search';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fontRegular24} from '../../utils/font';
import React from 'react';
import {SpacerColumn} from '../../components/Spacer/SpacerColumn';

const {height} = Dimensions.get('window');

const Home = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.black,
        paddingHorizontal: 16,
      }}>
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: 'https://static.vecteezy.com/system/resources/previews/012/876/809/non_2x/modern-world-map-technology-blue-background-vector.jpg',
        }}
        style={{
          height: height / 2.4,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={[
            {
              color: theme.colors.white,
              fontSize: 48,
              fontFamily: 'Poppins-Bold',
              fontWeight: '700',
            },
          ]}>
          WELCOME
        </Text>
      </ImageBackground>
      <SpacerColumn size={2} />
      <Text style={{color: theme.colors.gray200}}>
        Please enter location to search
      </Text>
      <SpacerColumn size={1.5} />
      <SearchInput borderColor="gray400" backgroundColor="gray700" />
    </SafeAreaView>
  );
};

export default Home;
