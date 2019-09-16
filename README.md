# React Native A to Z

## Instructions

- Run `yarn install`
- Run `react-native link`
- Run this command in the android/app/ directory to generate the debug keystore file `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000`
- Paste your google-services.json file inside your android/app folder
- Update Google map API key in Androidmanifest.xml file

## Commands

- `react-native run-android` Run application in Android mobile
- `react-native run-ios` Run application in IOS mobile
- `yarn start` Starts the react-native  bundle (react-native start)