/* eslint-disable react-native/no-inline-styles */
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  FlatList,
  NativeModules,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import React, { useCallback, useState } from "react";
import { fontMedium12, fontMedium16, fontMedium24 } from "../../utils/font";
import { theme } from "../../utils/theme";
import { SpacerColumn } from "../../components/Spacer/SpacerColumn";
import SVG from "../../components/SVG";
import styled from "styled-components/native";
import IconButton from "../../components/IconButton";
import { getBondedDevices } from "../../utils/bclassic";
import { BluetoothDevice } from "react-native-bluetooth-classic";
import RNBluetoothClassic from "react-native-bluetooth-classic";

const { BluetoothDiscoverableModule } = NativeModules;

const BClassicClient = () => {
  const navigation = useNavigation<any>();
  //For bluetooth classic
  const [bondedDevices, setBondedDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevices, setConnectedDevices] = useState<BluetoothDevice[]>(
    []
  );

  useFocusEffect(
    useCallback(() => {
      //For bluetooth classic
      const getInitialDevices = async () => {
        // const allConnectedDevices = await getConnectedDevices();
        // setConnectedDevices(allConnectedDevices ?? []);
        // const enabled = BluetoothDiscoverableModule.requestDiscoverable();
        BluetoothDiscoverableModule.requestDiscoverable(
          (err: any, msg: any) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(msg, "vhgfghfghfghf");
          }
        );
        // console.log('enabled', enabled);
        const allBondedDevices = await getBondedDevices();
        setBondedDevices(allBondedDevices ?? []);
      };
      getInitialDevices();

      // Add the listener for receiving data
      const subscription = RNBluetoothClassic.onStateChanged((data) => {
        console.log("Data received on state changed:", data);
      });

      return () => {
        subscription.remove();
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.black, flex: 1 }}>
      <ScrollView style={{ paddingVertical: 16 }}>
        <Wrapper>
          <Text style={[fontMedium24, { color: theme.colors.white }]}>
            Connected Devices
          </Text>
        </Wrapper>
        <SpacerColumn size={4} />
        <Pressable
          android_ripple={{ color: theme.colors.rippleColor }}
          style={(pressed) => [
            pressed && Platform.OS === "ios"
              ? { backgroundColor: theme.colors.rippleColor }
              : {},

            {
              paddingVertical: 12,
              paddingHorizontal: 16,
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
            },
          ]}
          onPress={() => navigation.navigate("Scan")}
        >
          <SVG
            source="plus"
            width={20}
            height={20}
            color={theme.colors.gray50}
          />
          <Text style={[fontMedium16, { color: theme.colors.gray50 }]}>
            Pair new device
          </Text>
        </Pressable>
        <SpacerColumn size={2} />
        <Wrapper>
          <Text style={[fontMedium12, { color: theme.colors.gray100 }]}>
            Connected Devices
          </Text>
        </Wrapper>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={connectedDevices}
          renderItem={({ item }) => {
            return (
              <>
                <IconButton
                  deviceId={item.id}
                  deviceName={item.name ?? item.id}
                  icon="headphone"
                  onPress={async () => {
                    console.log(
                      "Connected device pressed on Client side",
                      item.id
                    );

                    navigation.navigate("SendData", {
                      device: connectedDevices[0].address,
                    });

                    // const services = await connectedDevices[0].write(
                    //   'hello\n',
                    //   'utf-8',
                    // );
                    // console.log('services', services);
                    // writeToDevice(item.id);
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
          <Text style={[fontMedium12, { color: theme.colors.gray100 }]}>
            Saved Devices
          </Text>
        </Wrapper>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={bondedDevices}
          renderItem={({ item }) => {
            return (
              <>
                <IconButton
                  deviceName={item.name ?? item.id}
                  icon="headphone"
                  isPaired
                  deviceId={item.id}
                  setConnectedDevices={setConnectedDevices}
                  onPress={() => {
                    console.log("pressed");
                  }}
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

export default BClassicClient;

const Wrapper = styled.View`
  padding-horizontal: 16px;
`;
