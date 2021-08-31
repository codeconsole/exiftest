if [ $# -lt 1 ]; then
  echo "./bin/switch.sh [release/master/ryaa/ /cordova-plugin-camera-with-exif]"
  exit
fi

EXIF_PLUGIN=$(cordova plugin ls|grep cordova-plugin-camera-with-exif)
ANDROID_10=$(cordova platform ls|grep 'android 10.1')

if [ "$EXIF_PLUGIN" != "" ]; then
  echo "Uninstalling $EXIF_PLUGIN"
  cordova plugin remove cordova-plugin-camera-with-exif
else
  echo "Uninstalling cordova-plugin-camera"
  cordova plugin remove cordova-plugin-camera
fi

if [ "$1" == "release" ]; then
  VERSION=cordova-plugin-camera
elif [ "$1" == "master" ]; then
  VERSION=https://github.com/apache/cordova-plugin-camera.git
elif [ "$1" == "ryaa" ]; then
  VERSION=https://github.com/ryaa/cordova-plugin-camera.git
elif [ "$1" == "pullrequest" ]; then
  VERSION=https://github.com/codeconsole/cordova-plugin-camera.git#ryaa
elif [ "$1" == "cordova-plugin-camera-with-exif" ]; then
  VERSION=cordova-plugin-camera-with-exif
else
  echo "Unknown version '$1'. Installing release instead."
  VERSION=cordova-plugin-camera
fi

if [ "$ANDROID_10" != "" ] && [ "$VERSION" == "cordova-plugin-camera-with-exif" ]; then
  echo 'Installing android 9.x'
  cordova platform remove android
  cordova platform add android 
elif [ "$ANDROID_10" == "" ] && [ "$VERSION" != "cordova-plugin-camera-with-exif" ]; then
  echo 'Installing android 10.1.0'
  cordova platform remove android
  cordova platform add android@10.1.0
fi

echo "\n*** Installing \"$VERSION\"...\n"
echo cordova plugin add $VERSION
cordova plugin add $VERSION
echo "\n$(cordova plugin ls|grep cordova-plugin-camera) has been installed with$(cordova platform ls|grep 'android')"