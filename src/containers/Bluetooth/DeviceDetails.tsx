/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Dimensions, Modal, Pressable, Text, View } from "react-native";
import { StyledIcon } from "../../components/IconButton";
import { SpacerColumn } from "../../components/Spacer/SpacerColumn";
import SVG from "../../components/SVG";
import { theme } from "../../utils/theme";
import { connectToDevice, unpairDevice } from "../../utils/bclassic";
const { width } = Dimensions.get("window");

const DeviceDetails = ({
  device,
  modalVisible,
  setModalVisible,
}: {
  device: { deviceId: string; deviceName: string };
  modalVisible: boolean;
  setModalVisible: any;
  setConnectedDevices: any;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <Pressable
        style={{
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          flex: 1,
          alignItems: "center",
        }}
        onPress={() => setModalVisible(false)}
      />
      <View
        style={{
          position: "absolute",
          padding: 16,
          width: width,
          top: "40%",
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.gray400,
            width: "100%",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StyledIcon>
            <SVG
              source="headphone"
              width={20}
              height={20}
              color={theme.colors.gray50}
            />
          </StyledIcon>
          <SpacerColumn size={1} />
          <Text style={{ color: theme.colors.white }}>{device.deviceName}</Text>
          <SpacerColumn size={3} />
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={{
                flex: 1,
                borderRightWidth: 1,
                borderColor: theme.colors.gray300,
                paddingVertical: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                unpairDevice(device.deviceId);
                setModalVisible(false);
              }}
            >
              <SVG
                source={"forget"}
                width={20}
                height={20}
                color={theme.colors.gray50}
              />
              <SpacerColumn size={1} />
              <Text style={{ color: theme.colors.white }}>Forget</Text>
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                borderLeftWidth: 1,
                borderColor: theme.colors.gray300,
                paddingVertical: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={async () => {
                try {
                  // const connected = await RNBluetoothClassic.connectToDevice(
                  //   device.deviceId,
                  //   {
                  //     readTimeout: 5000,
                  //     readSize: 1024,
                  //   },
                  // );
                  // console.log(
                  //   'Connected device response at client',
                  //   JSON.stringify(connected, null, 2),
                  // );
                  // setConnectedDevices(connected ? [connected] : []);

                  connectToDevice(device.deviceId);
                  setModalVisible(false);
                } catch {
                  setModalVisible(false);
                }
              }}
            >
              <SVG
                source={"plus"}
                width={20}
                height={20}
                color={theme.colors.gray50}
              />
              <SpacerColumn size={1} />
              <Text style={{ color: theme.colors.white }}>Connect</Text>
            </Pressable>
          </View>
        </View>
        <SpacerColumn size={1} />
      </View>
    </Modal>
  );
};
export default DeviceDetails;
