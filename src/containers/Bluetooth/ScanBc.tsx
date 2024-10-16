/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import IconButton from '../../components/IconButton';
import Base from '../../components/Layout';
import RippleEffect from '../../components/RippleEffect';
import ScanButton from '../../components/ScanButton';
import {SpacerColumn} from '../../components/Spacer/SpacerColumn';
import {connectToDevice, pairDevice} from '../../utils/bclassic';

const {height} = Dimensions.get('window');

const ScanBc = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [loading, setLoading] = useState({index: -1});

  const startDiscovery = async () => {
    try {
      setIsScanning(true);
      const adapterState = await RNBluetoothClassic.isBluetoothEnabled();
      console.log('adapterState', adapterState);
      const unpairedDevices = await RNBluetoothClassic.startDiscovery();
      console.log(
        'UNPAIRED DEVICES......',
        unpairedDevices,
        JSON.stringify(unpairedDevices, null, 2),
      );
      setDevices(unpairedDevices);
    } catch (err) {
      console.error(err, 'failed to locate devices');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Base title="Add New Devices">
      <View style={{paddingBottom: 16, flex: 1}}>
        <View
          style={{
            height: height / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isScanning ? (
            <RippleEffect />
          ) : (
            <ScanButton startScan={startDiscovery} />
          )}
        </View>
        <SpacerColumn size={2} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={devices}
          renderItem={({item, index}) => (
            <IconButton
              deviceId={item.address}
              deviceName={item.name ?? 'No name'}
              icon="bluetooth"
              loading={loading.index === index}
              onPress={() => {
                setLoading({index: index});
                item.bonded
                  ? connectToDevice(item.address).finally(() => {
                      setLoading({index: -1});
                    })
                  : pairDevice(item.address).finally(() => {
                      setLoading({index: -1});
                    });
              }}
            />
          )}
        />
      </View>
    </Base>
  );
};

export default ScanBc;
