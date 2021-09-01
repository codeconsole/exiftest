const { Camera, Filesystem } = Capacitor.Plugins

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + Capacitor.platform)
    if (Camera) {
        document.getElementById('deviceready').classList.add('ready')
        document.getElementById('CAMERA').onclick = function() {
            processPhoto('CAMERA')
        }
        document.getElementById('PHOTOLIBRARY').onclick = function() {
            processPhoto('PHOTOS')
        }
    }

}


function processPhoto(source) {
    // https://github.com/ionic-team/capacitor/blob/2.4.9/core/src/core-plugin-definitions.ts
    Camera.checkPermissions().then(function(permissions) {
        if (permissions[source.toLowerCase()] != 'granted') {
            Camera.requestPermissions(source.toLowerCase()).then(function(permissionStatus) {
                if (permissions[source.toLowerCase()] != 'denied') {
                    processPhoto(source)
                } else {
                    alert('You have not granted access to use the '+source.toLowerCase())
                }
            })
        }
        Camera.getPhoto({
          quality: parseInt($('input[name=quality]').val()),
          resultType: $('select[name=destinationType]').val() == 'FILE_URI'? 'uri' : 'dataUrl',
          allowEditing: false,
          correctOrientation: $('input[name=correctOrientation]').val() == 'true',
          source: source
        }).then(function(photo) {
            $('#selectedImage').attr('src', photo.dataUrl? photo.dataUrl : photo.webPath).css('visibility', 'visible')

            if (photo.dataUrl) {
                var blob = CameraUtil.stringToBlob(photo.dataUrl.substring('data:image/jpeg;base64,'.length))
                photo.dataUrl = '[HIDDEN]'
                CameraUtil.showResult(blob, photo)
            } else{
                Filesystem.readFile({path: photo.path}).then(function(file) {
                    CameraUtil.showResult(CameraUtil.stringToBlob(file.data), photo)
                })
            }
        }, function(error) {
            console.error(error)
        })
    })
}
