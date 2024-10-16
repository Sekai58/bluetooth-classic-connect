import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import Routes from './src/routes';
import {createTheme} from './src/utils/theme';
import 'react-native-devsettings';
import bluetoothPermission from './src/utils/bluetoothPermission';
import BleManager from 'react-native-ble-manager';

const theme = createTheme(false);

const App = () => {
  useEffect(() => {
    BleManager.start({forceLegacy: true, showAlert: false}).then(() => {
      console.log('BleManager initialized');
    });
    bluetoothPermission();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.black}
      />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  );
};
export default App;
