document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    var cameraOptions = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI, // FILE_URI
        encodingType: Camera.EncodingType.JPEG, // JPEG
        pictureSourceType: Camera.PictureSourceType.CAMERA, // CAMERA 
    }
    console.log($('#camera-button'))
    console.log(navigator.camera)
    $('#camera-button').on('click', takePhoto);

    function takePhoto() {
        navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
    }

    function cameraSuccess(image) {
        // console.log('image', image)
        resolveLocalFileSystemURL(image, function(fileEntry) {
            $('#gallery').prepend(CreateCard(fileEntry.toURL()));
        });

        
    }

    function cameraError(error) {
        console.log('error', error);
    }

    function CreateCard(imageURL) {
        return `
            <div class="col-50 image-cell">
                <img src="${imageURL}">
            </div>
        `
    }
}
