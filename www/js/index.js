document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    console.log('Running Capacitor-' + Capacitor.platform)
    if (Capacitor.Plugins.Camera) {
        document.getElementById('deviceready').classList.add('ready')
        document.getElementById('CAMERA').onclick = function() {
            processPhoto('CAMERA')
        }
        document.getElementById('PHOTOLIBRARY').onclick = function() {
            processPhoto('PHOTOS')
        }
        document.getElementById('PICKIMAGES').onclick = function() {
            processPhoto('PICKIMAGES')
        }
    }
}


function processPhoto(source) {
    if (source == 'PICKIMAGES') {
        PhotoUtil.pickImages = true
        source = 'PHOTOS'
    }
    // https://github.com/ionic-team/capacitor/blob/2.4.9/core/src/core-plugin-definitions.ts
    // https://github.com/ionic-team/capacitor/blob/main/core/src/definitions.ts
    // https://github.com/ionic-team/capacitor-plugins/blob/main/camera/src/definitions.ts
    Capacitor.Plugins.Camera.checkPermissions().then(function(permissions) {
        if (permissions[source.toLowerCase()] != 'granted' && confirm(`Run Camera.requestPermissions('${source.toLowerCase()}')?`)) {
            Capacitor.Plugins.Camera.requestPermissions({permissions: [source.toLowerCase()]}).then(function(permissionStatus) {
                if (permissions[source.toLowerCase()] != 'denied') {
                    processPhoto(source)
                } else {
                    alert(`You have not granted access to use the '${source.toLowerCase()}'`)
                }
            })
            return
        } else if (permissions[source.toLowerCase()] != 'granted') {
            alert(`You do not have permission to access '${source.toLowerCase()}'`)
            return
        }            
        Capacitor.Plugins.Geolocation.requestPermissions().then(function(permissionStatus) {    
            alert(JSON.stringify(permissionStatus)) 
            var opts = { 
                quality: parseInt($('input[name=quality]').val()),
                resultType: $('select[name=destinationType]').val() == 'FILE_URI'? 'uri' : 'dataUrl',
                allowEditing: false,
                correctOrientation: $('input[name=correctOrientation]').val() == 'true'
            }
            if (PhotoUtil.pickImages) {
                opts.limit = 1
                Capacitor.Plugins.Camera.pickImages(opts).then(function(result) { 
                    PhotoUtil.displayPhoto(result.photos[0])
                }).catch(PhotoUtil.displayError) 
            } else {          
                opts.source = source
                Capacitor.Plugins.Camera.getPhoto(opts).then(PhotoUtil.displayPhoto).catch(PhotoUtil.displayError)   
            }  
         })   
    })
}

var PhotoUtil = {
    pickImages: false,
    displayPhoto: function(photo) {
        $('#selectedImage').attr('src', photo.dataUrl? photo.dataUrl : photo.webPath).css('visibility', 'visible')

        if (photo.dataUrl) {
            var blob = CameraUtil.stringToBlob(photo.dataUrl.substring('data:image/jpeg;base64,'.length))
            photo.dataUrl = '[HIDDEN]'
            CameraUtil.showResult(blob, photo)
        } else{
            Capacitor.Plugins.Filesystem.readFile({path: photo.path}).then(function(file) {
                CameraUtil.showResult(CameraUtil.stringToBlob(file.data), photo)
            })
        }
    },
    displayError: function(error) {
        alert(JSON.stringify(error))
    }   
}

