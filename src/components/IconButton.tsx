/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Platform, Pressable, Text} from 'react-native';
import icons from '../assets/svg';
import React, {useState} from 'react';
import {theme} from '../utils/theme';
import styled from 'styled-components/native';
import SVG from './SVG';
import {fontMedium16} from '../utils/font';
import DeviceDetails from '../containers/Bluetooth/DeviceDetails';

const IconButton = ({
  icon,
  deviceName,
  isPaired,
  onPress,
  deviceId,
  loading,
  setConnectedDevices,
}: {
  icon: keyof typeof icons;
  deviceName: string;
  deviceId: string;
  isPaired?: boolean;
  onPress?: any;
  loading?: boolean;
  setConnectedDevices?: any;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        android_ripple={{color: theme.colors.grayRipple}}
        style={({pressed}) => [
          pressed && Platform.OS === 'ios'
            ? {backgroundColor: theme.colors.grayRipple}
            : {},
          {
            justifyContent: 'space-between',
            //   alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
            flexDirection: 'row',
          },
        ]}
        onPress={onPress}>
        <Row>
          <StyledIcon>
            <SVG
              source={icon}
              width={20}
              height={20}
              color={theme.colors.gray50}
            />
          </StyledIcon>
          <Text style={[fontMedium16, {color: theme.colors.gray100}]}>
            {deviceName}
          </Text>
        </Row>
        {loading && (
          <ActivityIndicator size="small" color={theme.colors.gray50} />
        )}
        {isPaired && (
          <Pressable
            style={{
              borderLeftWidth: 1,
              borderColor: theme.colors.gray300,
              paddingHorizontal: 16,
              paddingVertical: 4,
            }}
            onPress={() => setModalVisible(true)}>
            <SVG
              source="settings"
              width={24}
              height={24}
              color={theme.colors.gray50}
            />
          </Pressable>
        )}
      </Pressable>
      {modalVisible && (
        <DeviceDetails
          device={{deviceId: deviceId, deviceName: deviceName}}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          setConnectedDevices={setConnectedDevices}
        />
      )}
    </>
  );
};

export default IconButton;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const StyledIcon = styled.View`
  border-radius: 999px;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.blue600};
`;
