# Cordova Camera Plugin EXIF Test App

This plugin demonstrates the Cordova Camera Plugin.
It allows you to select and image and then displaces the associated EXIF information after you select it.

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

https://github.com/apache/cordova-plugin-camera

For example, if you want to switch to using the master version in github, you can execute the following:
`./bin/switch.sh master`

https://github.com/apache/cordova-plugin-camera/pull/712
if you want to try the most up to date pull request, you can execute the following:
`./bin/switch.sh pullrequest`

if you want to try @ryaa 's version, you can execute the following:
`./bin/switch.sh ryaa`

You can always switch back to the release version:
`./bin/switch.sh release`

Unfortunately, this has been broken for a very long time.  I believe it is due to a new image being created in the temporary folder. It would be nice if the plugin supported a way to just upload the original or make an exact copy of the original rather than changing compression.

https://github.com/apache/cordova-plugin-camera/issues/524
