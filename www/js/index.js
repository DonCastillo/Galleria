document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    var cameraOptions = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI, // FILE_URI
        encodingType: Camera.EncodingType.JPEG, // JPEG
        pictureSourceType: Camera.PictureSourceType.CAMERA, // CAMERA 
    }

    $('#camera-button').on('click', function() {
        navigator.camera.getPicture(CameraSuccess, CameraError, cameraOptions);
    });
}


function CameraSuccess(image) {
    resolveLocalFileSystemURL(image, function(fileEntry) {
        fileName = fileEntry.name;
        const imageURL = fileEntry.toURL();
        $('#gallery').prepend(CreateCard(imageURL));
        imagesCaptured = [{image: imageURL, liked: false}, ...imagesCaptured];
        UpdateGallery();
        $('.image-cell').off().on('click', ImageCellClickHandler)
    });     
}

function CameraError(error) {
    console.error(error);
    alert(error);
}

function CreateCard(imageURL) {
    return `
        <div class="col-50 image-cell">
            <img src="${imageURL}">
            <div class="cell-liked"></div>
        </div>
    `;
}

 