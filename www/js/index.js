const { Camera, Filesystem } = Capacitor.Plugins

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    console.log('Running Capacitor-' + Capacitor.platform)
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
        if (permissions[source.toLowerCase()] != 'granted' && confirm('Run Camera.requestPermissions()?')) {
            Camera.requestPermissions(source.toLowerCase()).then(function(permissionStatus) {
                if (permissions[source.toLowerCase()] != 'denied') {
                    processPhoto(source)
                } else {
                    alert('You have not granted access to use the '+source.toLowerCase())
                }
                return
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
