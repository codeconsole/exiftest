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
        // quality: 50,
        //destinationType: Camera.DestinationType.DATA_URL,
        destinationType: Camera.DestinationType.FILE_URI,
        // saveToPhotoAlbum: source === Camera.PictureSourceType.CAMERA,
        // correctOrientation: false,
        sourceType: source
    }

    navigator.camera.getPicture(function(imageURI) {
        //$('#upload-computer div.img-wrap img').attr('src', submitDestinationType == Camera.DestinationType.DATA_URL? 'data:image/jpeg;base64,'+imageData : imageData)
        // https://github.com/apache/cordova-ios/issues/883
        // https://github.com/apache/cordova-plugin-camera/issues/622
        // https://github.com/apache/cordova-ios/issues/947
        function processFile(blob) {
            EXIF.getData(blob, function() {
                var allMetaData = EXIF.getAllTags(this);
                alert(JSON.stringify(allMetaData, null, "\t"));
            });            
        }
        document.getElementById('selectedImage').style = '';
        if (cordova.platformId == 'browser') { // result is always Camera.DestinationType.DATA_URL
            document.getElementById('selectedImage').src = 'data:image/jpeg;base64,'+imageURI;
            
            // https://stackoverflow.com/questions/15341912/how-to-go-from-blob-to-arraybuffer
            const byteCharacters = atob(imageURI);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            processFile(new Blob([new Uint8Array(byteNumbers)], {type: 'image/jpg'}));
        } else {
            if (cordova.platformId == 'Android' && imageURI.indexOf('file://') == -1) {
                imageURI = 'file://' + imageURI;
            }
            document.getElementById('selectedImage').src = cordova.platformId == 'iOS'? window.WkWebView.convertFilePath(imageURI) : imageURI
            window.resolveLocalFileSystemURL(imageURI,
                function success(fileEntry) {
                    fileEntry.file(function (file) {
                        var reader = new FileReader();
                        reader.onloadend = function() {
                            // https://stackoverflow.com/questions/27159179/how-to-convert-blob-to-file-in-javascript
                            processFile(new Blob([new Uint8Array(this.result)], {type: file.contentType}));
                        }
                        reader.readAsArrayBuffer(file)
                    }, function (err) { 
                        console.error('error converting fileentry to file!' + err);
                    })
                }, function (err) {
                    console.log('imageURI: '+ imageURI);
                    console.error('error getting fileentry file!' + JSON.stringify(err));
            })
        }
    }, function(message) {
        if (message != 'No Image Selected') {
            alert(JSON.stringify(message));
        }
    }, opts);
}
