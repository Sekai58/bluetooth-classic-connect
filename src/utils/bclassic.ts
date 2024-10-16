/* eslint-disable no-catch-shadow */
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const getBondedDevices = async () => {
  try {
    const paired = await RNBluetoothClassic.getBondedDevices();
    return paired;
  } catch (err) {
    // Error if Bluetooth is not enabled
    // Or there are any issues requesting paired devices
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        console.log('Bluetooth is not enabled');
        RNBluetoothClassic.openBluetoothSettings();
        return [];
      }
    } catch (err) {
      // Handle accordingly
    }
  }
};

export const getConnectedDevices = async () => {
  try {
    const connected = await RNBluetoothClassic.getConnectedDevices();
    console.log('connected devices here', JSON.stringify(connected, null, 2));
    return connected;
  } catch (err) {
    // Error if Bluetooth is not enabled
    // Or there are any issues requesting connected devices
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        console.log('Bluetooth is not enabled');
        RNBluetoothClassic.openBluetoothSettings();
      }
    } catch (err) {
      // Handle accordingly
    }
  }
};

export const connectToDevice = async (deviceAddress: string) => {
  try {
    const connected = await RNBluetoothClassic.connectToDevice(deviceAddress, {
      readTimeout: 5000,
      readSize: 1024,
    });
    console.log(
      'Connected device response at client',
      JSON.stringify(connected, null, 2),
    );
  } catch (err) {
    // Error if Bluetooth is not enabled
    // Or there are any issues requesting connected devices
    console.log('err connecting classic', err);
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        console.log('Bluetooth is not enabled');
        RNBluetoothClassic.openBluetoothSettings();
      }
    } catch (err) {
      // Handle accordingly
    }
  }
};

export const pairDevice = async (deviceAddress: string) => {
  try {
    const connected = await RNBluetoothClassic.pairDevice(deviceAddress);
    console.log('Paired device success', JSON.stringify(connected, null, 2));
    // connectToDevice(connected.address);
  } catch (err) {
    // Error if Bluetooth is not enabled
    // Or there are any issues requesting connected devices
    console.log('err pairing classic', err);
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        console.log('Bluetooth is not enabled');
        RNBluetoothClassic.openBluetoothSettings();
      }
    } catch (err) {
      // Handle accordingly
    }
  }
};

export const unpairDevice = async (deviceAddress: string) => {
  try {
    const connected = await RNBluetoothClassic.unpairDevice(deviceAddress);
    console.log('unpaired connected', connected);
  } catch (err) {
    // Error if Bluetooth is not enabled
    // Or there are any issues requesting connected devices
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        console.log('Bluetooth is not enabled');
        RNBluetoothClassic.openBluetoothSettings();
      }
    } catch (err) {
      // Handle accordingly
    }
  }
};

export const getDeviceServices = async (deviceAddress: string) => {
  try {
    const services = await RNBluetoothClassic.readFromDevice(deviceAddress);
    console.log('services', services);
    return services;
  } catch (err) {
    // Error if Bluetooth is not enabled
    // Or there are any issues requesting connected devices
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        console.log('Bluetooth is not enabled');
        RNBluetoothClassic.openBluetoothSettings();
      }
    } catch (err) {
      // Handle accordingly
    }
  }
};

export const readFromDevice = async (deviceAddress: string) => {
  try {
    const services = await RNBluetoothClassic.readFromDevice(deviceAddress);
    console.log('services', services);
    return services;
  } catch (err) {
    // Error if Bluetooth is not enabled
    // Or there are any issues requesting connected devices
    console.log('err reading classic', err);
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        console.log('Bluetooth is not enabled');
        RNBluetoothClassic.openBluetoothSettings();
      }
    } catch (err) {
      // Handle accordingly
    }
  }
};

export const writeToDevice = async (deviceAddress: string) => {
  try {
    const services = await RNBluetoothClassic.writeToDevice(
      deviceAddress,
      'hello',
      'utf-8',
    );
    console.log('services', services, deviceAddress);
    return services;
  } catch (err) {
    // Error if Bluetooth is not enabled
    // Or there are any issues requesting connected devices
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        console.log('Bluetooth is not enabled');
        RNBluetoothClassic.openBluetoothSettings();
      }
    } catch (err) {
      // Handle accordingly
    }
  }
};
