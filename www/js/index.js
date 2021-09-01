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
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    if (navigator.camera) {
	    document.getElementById('deviceready').classList.add('ready');
	    document.getElementById('CAMERA').onclick = function() {
	    	processPhoto(Camera.PictureSourceType.CAMERA);
	    }
	    document.getElementById('PHOTOLIBRARY').onclick = function() {
	    	processPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
	    }
    }
}

function processPhoto(source) {
    var opts = {
        quality: parseInt($('input[name=quality]').val()),
        destinationType: Camera.DestinationType[$('select[name=destinationType]').val()],
        correctOrientation: $('input[name=correctOrientation]').val() == 'true',
        sourceType: source
    }

    navigator.camera.getPicture(function(imageURI) {
        var img = { filename: imageURI }
        if (imageURI.indexOf('filename') != -1) {
            img = JSON.parse(imageURI)
            img.json_metadata = JSON.parse(img.json_metadata)
        }
        var selectedImage = $('#selectedImage')
        selectedImage.css('visibility', 'visible')
        if (cordova.platformId == 'browser' || opts.destinationType == Camera.DestinationType.DATA_URL) {
            selectedImage.attr('src', 'data:image/jpeg;base64,'+img.filename)
            var blob = CameraUtil.stringToBlob(img.filename)
            img.filename = '[HIDDEN]'
            CameraUtil.showResult(blob, img)
        } else {
            if (cordova.platformId === 'android' 
                && img.filename.indexOf('file://') == -1
                && img.filename.indexOf('content://') == -1) {
                img.filename = 'file://' + img.filename;
            }
            selectedImage.attr('src', cordova.platformId == 'iOS'? window.WkWebView.convertFilePath(img.filename) : img.filename)
            window.resolveLocalFileSystemURL(img.filename,
                function success(fileEntry) {
                    fileEntry.file(function (file) {
                        var reader = new FileReader();
                        reader.onloadend = function() {
                            // https://stackoverflow.com/questions/27159179/how-to-convert-blob-to-file-in-javascript
                            CameraUtil.showResult(new Blob([new Uint8Array(this.result)], {type: file.contentType}), img)
                        }
                        reader.readAsArrayBuffer(file)
                    }, function (err) { 
                        alert('Error converting fileentry to file!' + JSON.stringify(err));
                    })
                }, function (err) {
                    console.log('filename: '+ img.filename);
                    alert('Error getting fileentry file!' + JSON.stringify(err));
            })
        }
    }, function(message) {
        if (message != 'No Image Selected') {
            alert(JSON.stringify(message));
        }
    }, opts);
}
