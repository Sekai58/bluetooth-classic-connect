package com.geoblue;

import android.Manifest;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.AdvertiseCallback;
import android.bluetooth.le.AdvertiseData;
import android.bluetooth.le.AdvertiseSettings;
import android.bluetooth.le.BluetoothLeAdvertiser;
import android.content.Context;
import android.content.pm.PackageManager;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

public class BLEPeripheralModule extends ReactContextBaseJavaModule {

    private BluetoothLeAdvertiser advertiser;
    private AdvertiseCallback advertiseCallback;
    private static final String TAG = "BLEPeripheralModule";
    private final ReactApplicationContext reactContext;

    public BLEPeripheralModule(ReactApplicationContext reactContext) {
        super(reactContext);
        BluetoothManager bluetoothManager = (BluetoothManager) reactContext.getSystemService(Context.BLUETOOTH_SERVICE);
        BluetoothAdapter bluetoothAdapter = bluetoothManager.getAdapter();
        if (bluetoothAdapter != null) {
            advertiser = bluetoothAdapter.getBluetoothLeAdvertiser();
        }
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "BLEPeripheralModule";
    }

    @ReactMethod
    public void startAdvertising(Promise promise) {
        Log.d(TAG,"startAdvertising at android");
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
        promise.reject("BLE", "Current Activity is null");
        return;
    }

        if (advertiser == null) {
            promise.reject("BLE", "Bluetooth LE Advertiser not available");
            return;
        }

        AdvertiseSettings settings = new AdvertiseSettings.Builder()
                .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
                .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_HIGH)
                .setConnectable(true)
                .build();

        AdvertiseData data = new AdvertiseData.Builder()
                .setIncludeDeviceName(true)
                .build();

        advertiseCallback = new AdvertiseCallback() {
            @Override
            public void onStartSuccess(AdvertiseSettings settingsInEffect) {
                super.onStartSuccess(settingsInEffect);
                promise.resolve("Advertising started successfully");
            }

            @Override
            public void onStartFailure(int errorCode) {
                super.onStartFailure(errorCode);
                promise.reject("BLE", "Advertising failed with error code: " + errorCode);
            }
        };

        Log.d(TAG,"startAdvertising before requestPermissions");

        if (ContextCompat.checkSelfPermission(currentActivity, android.Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {

            // Request the necessary permissions
            ActivityCompat.requestPermissions(currentActivity, new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    2);

            // Handle this in onRequestPermissionsResult (outside this method)
            promise.reject("Requested Location Permission");
            return;
        }

        Log.d(TAG,"startAdvertising after requestPermissions");


        advertiser.startAdvertising(settings, data, advertiseCallback);
    }

    @ReactMethod
    public void stopAdvertising(Promise promise) {
        if (advertiser == null) {
            promise.reject("BLE", "Bluetooth LE Advertiser not available");
            return;
        }

//        if (advertiseCallback != null) {
//            advertiser.stopAdvertising(advertiseCallback);
//            promise.resolve("Advertising stopped successfully");
//        } else {
//            promise.reject("BLE", "No advertising process to stop");
//        }
    }
}
