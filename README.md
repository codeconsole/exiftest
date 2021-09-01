# Capacitor Camera Plugin EXIF Test App

This plugin demonstrates the Capacitor Camera Plugin.
It allows you to select and image and then displays the associated EXIF information after you select it.

What this example demonstrates is a specific photo can not be selected from the Simulator (Pink Flowers)

To set up this example:
```
./bin/capacitorInit.sh
```
or manually:
```
npm install
npx cap add ios
npx cap add android
cp conf/Info.plist ios/App/App/Info.plist
cp conf/AndroidManifest.xml android/app/src/main/AndroidManifest.xml
```

Followed by:
```
npx cap run ios
```

https://github.com/ionic-team/capacitor-plugins/issues/587


![Bad Image](https://raw.githubusercontent.com/codeconsole/exiftest/capacitor/screenshots/bad-image.jpg)

![XCode Output](https://raw.githubusercontent.com/codeconsole/exiftest/capacitor/screenshots/logging.jpg)
