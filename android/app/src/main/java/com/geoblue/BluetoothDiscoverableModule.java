// BluetoothDiscoverableModule.java
package com.geoblue;

import android.Manifest;
import android.content.Intent;
import android.app.Activity;
import android.content.Context;
import android.provider.Settings;
import android.bluetooth.BluetoothAdapter;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.content.pm.PackageManager;


public class BluetoothDiscoverableModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public BluetoothDiscoverableModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "BluetoothDiscoverableModule";
    }

    @ReactMethod
    public void requestDiscoverable(Callback callback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            callback.invoke("No activity");
            return;
        }

        // Check if Bluetooth and Location permissions are granted
        if (ContextCompat.checkSelfPermission(currentActivity, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {

            // Request the necessary permissions
            ActivityCompat.requestPermissions(currentActivity, new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    2);

            // Handle this in onRequestPermissionsResult (outside this method)
            callback.invoke("Requested Location Permission");
            return;
        }

        // If permissions are granted, proceed with making the device discoverable
        try {
            BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
            if (bluetoothAdapter != null) {
                Intent discoverableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
                discoverableIntent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, 300); // 5 minutes
                currentActivity.startActivityForResult(discoverableIntent, 1);
                callback.invoke("Discoverable request sent");
            } else {
                callback.invoke("Bluetooth not supported");
            }
        } catch (SecurityException e) {
            callback.invoke("SecurityException: " + e.getMessage());
        }
    }
}
