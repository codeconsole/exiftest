var CameraUtil = {
    showResult: function(blob, photo) {
        EXIF.getData(blob, function() {
            photo.fileExif = EXIF.getAllTags(this)
            if (photo.fileExif.MakerNote) {
                photo.fileExif.MakerNote = '[HIDDEN]'
            }
            $('#RESULT pre').text(JSON.stringify(photo, null, "\t"))
            $('#RESULT').show()
        });   
    },
    stringToBlob: function(base64s) {
        var byteCharacters = atob(base64s);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        return new Blob([new Uint8Array(byteNumbers)], {type: 'image/jpg'})
    }   
}
