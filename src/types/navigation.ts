import {NavigatorScreenParams} from '@react-navigation/native';

export type BottomTabParamList = {
  Home: undefined;
  Bluetooth: undefined;
  Map: undefined;
};

export type RootStackParamList = {
  MainTab: NavigatorScreenParams<BottomTabParamList>;
  Scan: undefined;
  BClassicClient: undefined;
  BClassicServer: undefined;
  SendData: undefined;
  ReceiveData: undefined;
  Ble: undefined;
};
