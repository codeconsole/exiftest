# Cordova Camera Plugin EXIF Test App

This plugin demonstrates the broken Cordova Camera Plugin.
https://github.com/apache/cordova-plugin-camera/issues/759

It allows you to select and image and then displays the associated EXIF information after you select it.

What this example demonstrates is that the orginal EXIF information is lost when selecting a file from the photo library.
The browser version works fine.

To run this example:

```
  git clone https://github.com/codeconsole/exiftest
  cd exiftest
  cordova prepare
  cordova platform remove android
  cordova platform add android@10.1.0
  cordova run ios/browser/android
```

After running the ios version, a script is provided to install an example image with exif info onto the simulator.  You can run the following but MAKE SURE YOU RUN IT WHILE THE IOS SIMULATOR IS RUNNING: 
```
./bin/copyExamplePhotoToRunningSim.sh
```

A script is provided to test various versions of the plugin which currently defaults to v5.0.1

https://github.com/apache/cordova-plugin-camera/pull/712
if you want to try the most up to date pull request that fixes the exif from the photo library, you can execute the following:
```
./bin/switch.sh pullrequest
```

if you want to try @ryaa 's version, you can execute the following:
```
./bin/switch.sh ryaa
```

https://github.com/apache/cordova-plugin-camera
if you want to switch to using the master version in github, you can execute the following:
```
./bin/switch.sh master
```

https://github.com/remoorejr/cordova-plugin-camera-with-exif
if you want to switch to using a different plugin that works, you can execute the following:
```
./bin/switch.sh cordova-plugin-camera-with-exif
```

You can always switch back to the release version:
```
./bin/switch.sh release
```

# Corodva EXIF Current State

https://github.com/apache/cordova-plugin-camera/issues/759

https://github.com/apache/cordova-plugin-camera/issues/524


Unfortunately, this has been broken for a very long time.  Although I have been using cordova/phonegap for almost a decade, I feel it is time to start exploring other options. It seems a lot of people who have created unanswered issues with the Camera plguin have also moved to other frameworks due to no response. 
I am starting to explore migrating my app to capacitor.  As a demonstration, I did so here: https://github.com/codeconsole/exiftest/tree/capacitor
So far I have found it to be working with the strange exception of 1 of the images from the simulator phone libary not loading and throwing an exception.
Depending on which issue gets a response first will determine whether or not I end my almost 10 year relationship with Cordova.

