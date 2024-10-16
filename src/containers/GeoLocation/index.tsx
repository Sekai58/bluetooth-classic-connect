import {SafeAreaView, Share, Text} from 'react-native';
import {theme} from '../../utils/theme';
import React from 'react';

const GeoLocation = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.black}}>
      <Text
        style={{fontSize: 20, color: theme.colors.grayLight}}
        onPress={() => {
          Share.share({
            url: 'nbdjsbfjhbdhnf',
            message: 'Share message',
            title: 'Share title',
          });
        }}>
        GeoLocation
      </Text>
    </SafeAreaView>
  );
};

export default GeoLocation;
