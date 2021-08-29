if [ $# -lt 1 ]; then
  echo "./bin/switch.sh [release/master/ryaa/pullrequest/cordova-plugin-camera-with-exif]"
  exit
fi
cordova plugin remove cordova-plugin-camera-with-exif
cordova plugin remove cordova-plugin-camera
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
echo "\n*** Installing \"$VERSION\"...\n"
echo cordova plugin add $VERSION
cordova plugin add $VERSION