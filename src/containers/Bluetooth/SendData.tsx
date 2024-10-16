/* eslint-disable react-native/no-inline-styles */
import styled from "styled-components/native";
import { theme } from "../../utils/theme";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import { SpacerColumn } from "../../components/Spacer/SpacerColumn";
import React, { useState } from "react";
import SVG from "../../components/SVG";
import RNBluetoothClassic from "react-native-bluetooth-classic";

const SendData = ({ route }: any) => {
  const { device } = route.params;
  const [text, setText] = useState("");

  // const launchCameraAndUpload = async () => {
  //   const result = await launchCamera({
  //     mediaType: 'photo',
  //     quality: 0.1,
  //     includeBase64: true,
  //   });
  //   // console.log('result', result?.assets?.[0]?.base64);
  //   const chunkSize = 512; // or adjust based on your Bluetooth packet size
  //   const totalChunks = Math.ceil(
  //     result?.assets?.[0]?.base64?.length ?? 0 / chunkSize,
  //   );

  //   for (let i = 0; i < totalChunks; i++) {
  //     const chunk = result?.assets?.[0]?.base64?.slice(
  //       i * chunkSize,
  //       (i + 1) * chunkSize,
  //     );
  //     const message = JSON.stringify({
  //       index: i,
  //       total: totalChunks,
  //       data: chunk,
  //     });

  //     RNBluetoothClassic.writeToDevice(device, message, 'base64');
  //     // device.write(message, 'base64');
  //   }
  // };

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.black, flex: 1, padding: 16 }}
    >
      <SpacerColumn size={4} />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <View style={{ flex: 1 }}>
          <StyledTextInput
            placeholder="Enter your message"
            placeholderTextColor={theme.colors.gray50}
            multiline
            onChangeText={(text) => {
              setText(text);
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.blue600,
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 999,
          }}
          onPress={() => {
            console.log("pressee send", device);
            RNBluetoothClassic.writeToDevice(
              device,
              JSON.stringify({
                index: 0,
                total: 1,
                data: text,
              }),
              "utf-8"
            );
            // RNBluetoothClassic.writeToDevice(device, text + '\n', 'utf-8');

            // device.write(text + '\n', 'utf-8');
          }}
        >
          <SVG
            source="send"
            width={24}
            height={24}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>

      <SpacerColumn size={4} />

      {/* <TouchableOpacity
        onPress={launchCameraAndUpload}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          paddingVertical: 32,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: theme.colors.brightBlue,
          width: '100%',
        }}>
        <SVG source="image" width={24} height={24} color={theme.colors.white} />
        <SpacerColumn size={2} />
        <Text style={{color: theme.colors.white}}>Send Image</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default SendData;

const StyledTextInput = styled.TextInput`
  padding-horizontal: 16px;
  border-radius: 8px;
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 500;
  border-width: 1px;
  border-color: ${theme.colors.gray700};
`;
