/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import SVG from '../SVG';
import {theme} from '../../utils/theme';
import icons from '../../assets/svg';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';

const {width} = Dimensions.get('window');

const AnimatedTabBarButton = ({
  iconName,
  label,
  isPressed,
}: {
  iconName: keyof typeof icons;
  label: string;
  isPressed: boolean;
}) => {
  const navigation = useNavigation();
  const widthOffset = useSharedValue(32);

  useEffect(() => {
    widthOffset.value = withTiming(width / 3 - 32, {
      duration: 200, // Add a duration to control timing
      easing: Easing.inOut(Easing.quad),
    });
  }, []);

  const handlePress = () => {
    widthOffset.value = 32;
    (widthOffset.value = withTiming(width / 3 - 32, {
      duration: 200, // Add a duration to control timing
      easing: Easing.inOut(Easing.quad),
    })),
      runOnJS(navigation.navigate)(label);
  };

  const animatedTabChange = useAnimatedStyle(() => ({
    width: widthOffset.value,
  }));

  return (
    <>
      {isPressed ? (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: width / 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.View style={[{}, animatedTabChange]}>
            <View
              style={{
                backgroundColor: 'rgba(25,243,255,0.05)',
                paddingVertical: 8,
                flexDirection: 'row',
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SVG
                source={iconName}
                width={20}
                height={20}
                color={theme.colors.brightBlue}
              />
              <Text
                style={{
                  marginLeft: 8,
                  color: theme.colors.brightBlue,
                  fontSize: 14,
                  fontWeight: 'medium',
                  fontFamily: 'Poppins',
                }}>
                {label}
              </Text>
            </View>
          </Animated.View>
        </View>
      ) : (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handlePress}>
          <SVG
            source={iconName}
            width={20}
            height={20}
            color={theme.colors.gray100}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

const CustomTabBarButton = ({
  iconName,
  handlePress,
}: {
  iconName: keyof typeof icons;
  handlePress: any;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        marginTop: -40,
      }}>
      <View
        style={{
          width: 68,
          height: 68,
          borderRadius: 999,
          backgroundColor: theme.colors.gray700,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          colors={[theme.colors.brightBlue, theme.colors.blue300]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            padding: 8,
            width: 64,
            height: 64,
            borderRadius: 999,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SVG
            source={iconName}
            width={28}
            height={28}
            color={theme.colors.white}
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export {AnimatedTabBarButton, CustomTabBarButton};
