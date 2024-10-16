/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  NativeModules,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import styled from 'styled-components/native';
import IconButton from '../../components/IconButton';
import {SpacerColumn} from '../../components/Spacer/SpacerColumn';
import {getBondedDevices} from '../../utils/bclassic';
import {fontMedium12, fontMedium24} from '../../utils/font';
import {theme} from '../../utils/theme';
const {BluetoothDiscoverableModule} = NativeModules;

const BClassicServer = () => {
  //For bluetooth classic
  const [bondedDevices, setBondedDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevices, setConnectedDevices] = useState<BluetoothDevice[]>(
    [],
  );

  let receivedChunks: any = [];
  let totalChunks = 0;

  useFocusEffect(
    useCallback(() => {
      //For bluetooth classic
      const getInitialDevices = async () => {
        // const allConnectedDevices = await getConnectedDevices();
        // setConnectedDevices(allConnectedDevices ?? []);
        BluetoothDiscoverableModule.requestDiscoverable((err: any) => {
          if (err) {
            console.log(err);
            return;
          }
        });
        const allBondedDevices = await getBondedDevices();
        setBondedDevices(allBondedDevices ?? []);

        //Start server fro listening to connected devices
        const device = await RNBluetoothClassic.accept({
          delimiter: '\n', // Example delimiter
          secure: true, // Secure connection
        });

        setConnectedDevices(device ? [device] : []);

        // console.log('Connected device response at server', device.);
        console.log(
          'Connected device response at server',
          JSON.stringify(device, null, 2),
        );
      };
      getInitialDevices();

      // Add the listener for receiving data
      const subscription = RNBluetoothClassic.onStateChanged(data => {
        console.log('Data received on state changed:', data);
      });

      return () => {
        subscription.remove();
      };
    }, []),
  );

  useEffect(() => {
    let interval: any;
    if (connectedDevices.length > 0) {
      interval = setInterval(async () => {
        try {
          // Poll for new data
          const message = await RNBluetoothClassic.readFromDevice(
            connectedDevices[0].address,
          );
          // const message: string = (await connectedDevices[0].read()).toString();
          console.log('message', message);

          if (message) {
            // console.log('Received data:', message);
            // Save the chunk in the correct position
            // receivedChunks[index] = message;
            // const binaryData = Buffer.from(message, 'base64');
            // const imageData = binaryData.toString('binary');
            // console.log('Image data', imageData);
            console.log('message', message);
            // const {index, total, data} = JSON.parse(message);

            // Store the total number of chunks on the first message
            // if (receivedChunks.length === 0) {
            //   totalChunks = total;
            // }

            // Save the chunk in the correct position
            // receivedChunks[index] = data;

            // Check if all chunks have been received
            // if (
            //   receivedChunks.length === totalChunks &&
            //   !receivedChunks.includes(undefined)
            // ) {
            //   const base64Image = receivedChunks.join('');
            //   const binaryData = Buffer.from(base64Image, 'base64');
            //   const imageUri = `data:image/jpeg;base64,${binaryData.toString(
            //     'base64',
            //   )}`;
            //   console.log(
            //     'Image uri here/.....................................',
            //     imageUri,
            //   );

            //   // Now you can use the imageUri to display the image
            //   console.log('Image successfully reconstructed');
            // }
          }
        } catch (error) {
          console.error('Error reading data:', error);
        }
      }, 1000); // Polling interval in milliseconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [connectedDevices]);

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.black, flex: 1}}>
      <ScrollView style={{paddingVertical: 16}}>
        <Wrapper>
          <Text style={[fontMedium24, {color: theme.colors.white}]}>
            Connected Devices
          </Text>
        </Wrapper>
        <SpacerColumn size={4} />
        {/* <Pressable
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
        </Pressable> */}
        <SpacerColumn size={2} />
        <Wrapper>
          <Text style={[fontMedium12, {color: theme.colors.gray100}]}>
            Connected Devices
          </Text>
        </Wrapper>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={connectedDevices}
          renderItem={({item}) => {
            return (
              <>
                <IconButton
                  deviceId={item.id}
                  deviceName={item.name ?? item.id}
                  icon="headphone"
                  onPress={async () => {
                    //For low energy device
                    // BleManager.disconnect(item.id);
                    console.log(
                      'Connected device pressed on Server side',
                      item.id,
                    );
                  }}
                />
              </>
            );
          }}
        />
        <SpacerColumn size={1} />
        <SpacerColumn size={0.125} backgroundColor="gray700" />
        <SpacerColumn size={2} />
        <Wrapper>
          <Text style={[fontMedium12, {color: theme.colors.gray100}]}>
            Saved Devices
          </Text>
        </Wrapper>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={bondedDevices}
          renderItem={({item}) => {
            return (
              <>
                <IconButton
                  deviceName={item.name ?? item.id}
                  icon="headphone"
                  deviceId={item.id}
                />
              </>
            );
          }}
        />
        <SpacerColumn size={1} />
        <SpacerColumn size={0.125} backgroundColor="gray700" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BClassicServer;

const Wrapper = styled.View`
  padding-horizontal: 16px;
`;
