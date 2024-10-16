// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-bluetooth-classic': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
  },
};
