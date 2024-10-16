/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Containers from "./containers";
import {
  BottomTabParamList,
  type RootStackParamList,
} from "./types/navigation";
import CustomTabBar from "./components/Button/CustomTabBar";

const {
  GeoLocation,
  Home,
  ScanBc,
  BClassicClient,
  BClassicServer,
  BClassic,
  SendData,
} = Containers;
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();
const options = {
  headerShown: false,
  gestureEnabled: true,
};

function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ tabBarHideOnKeyboard: true }}
    >
      <Tab.Screen name="Home" options={options} component={Home} />
      <Tab.Screen name="Bluetooth" options={options} component={BClassic} />
      <Tab.Screen name="Map" options={options} component={GeoLocation} />
    </Tab.Navigator>
  );
}

const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            orientation: "portrait",
            headerShown: false,
            contentStyle: {
              backgroundColor: "white",
            },
          }}
          initialRouteName={"MainTab"}
        >
          <Stack.Screen name="MainTab" options={options} component={MainTab} />
          <Stack.Screen name="Scan" options={options} component={ScanBc} />
          <Stack.Screen
            name="BClassicClient"
            options={options}
            component={BClassicClient}
          />
          <Stack.Screen
            name="BClassicServer"
            options={options}
            component={BClassicServer}
          />
          <Stack.Screen
            name="SendData"
            options={options}
            component={SendData}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
