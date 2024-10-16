import {PermissionsAndroid} from 'react-native';
import BleManager from 'react-native-ble-manager';

export default async () => {
  BleManager.enableBluetooth()
    .then(() => {
      console.log('Bluetooth is turned on!');
    })
    .catch(error => {
      console.log(error);
    });
  // if (Platform.OS === 'android' && Platform.Version >= 31) {
  PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
  ])
    .then(result => {
      if (result) {
        console.debug(
          '[handleAndroidPermissions] User accepts runtime permissions android 12+',
        );
      } else {
        console.error(
          '[handleAndroidPermissions] User refuses runtime permissions android 12+',
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
  // } else if (Platform.OS === 'android' && Platform.Version >= 23) {
  //   PermissionsAndroid.check(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  //   ).then(checkResult => {
  //     if (checkResult) {
  //       console.debug(
  //         '[handleAndroidPermissions] runtime permission Android <12 already OK',
  //       );
  //     } else {
  //       PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  //       ).then(requestResult => {
  //         if (requestResult) {
  //           console.debug(
  //             '[handleAndroidPermissions] User accepts runtime permission android <12',
  //           );
  //         } else {
  //           console.error(
  //             '[handleAndroidPermissions] User refuses runtime permission android <12',
  //           );
  //         }
  //       });
  //     }
  //   });
  // }
};
