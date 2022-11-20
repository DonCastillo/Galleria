var app = new Framework7({
    el: '#app',
    name: 'Galleria',
    id: 'com.myapp.galleria',
    routes: [
        {
            path: '/',
            url: 'index.html'
        }
    ]
});

var imagesCaptured = [];
var mainView = app.views.create('.view-main');
var photoBrowser;

$('.image-cell').on('click', ImageCellClickHandler)


function ImageCellClickHandler(event) {
    event.preventDefault();
    const el = $(this);
    let imageURL = '';
    imageURL = el.find('img').attr('src');

    let imageIndex = imagesCaptured.findIndex(imageObj => {
        return imageObj.image == imageURL;
    });

    photoBrowser = app.photoBrowser.create({
        photos:  imagesCaptured.map(imageObj => imageObj.image),
        exposition: false,
        swiper: {
            initialSlide: imageIndex,
            slidesPerView: 1,
            zoom: {
                enabled: false
            },
            lazy: {
                enabled: false
            }
        }
    });

    photoBrowser.open();
    AddButtons();
    photoBrowser.on('slideChange', AddButtons);
}



function DeleteImage(event) {
    event.preventDefault();
    const imageURL = $(this).parent().parent().parent().find('img').attr('src');

    // filter out deleted image
    imagesCaptured = imagesCaptured.filter(imageObj => {
        return imageObj.image !== imageURL
    });
    
    // delete image from the gallery
    $(`#gallery img[src="${imageURL}"]`).parent().remove();

    // remove buttons
    $(this).parent().parent('.photo-buttons').remove();

    // replenish images
    $('.image-cell').off().on('click', ImageCellClickHandler);

    photoBrowser.swiper.removeSlide(0);
    photoBrowser.swiper.update();
    photoBrowser.close();
}


function LikeImage(event) {
    event.preventDefault()
    const imageURL = $(this).parent().parent().parent().find('img').attr('src');

    // update like button style
    if($(this).hasClass('liked')) {
        $(this).removeClass('liked');
    } else {
        $(this).addClass('liked');
    }

    // update the collection
    imagesCaptured = imagesCaptured.map(imageObj => {
        if(imageObj.image == imageURL) {
            imageObj.liked = !imageObj.liked;
        }
        return imageObj;
    });
    
    UpdateGallery();
}



function AddButtons() {
    const button = `
    <div class="photo-buttons row no-gap w-100">
        <div class="col-50 padding-vertical">
            <a href="#" class="ripple like-button">
                <i class="icon f7-icons if-not-md">hand_thumbsup</i>
                <i class="icon material-icons md-only">thumb_up</i>
            </a>
        </div>
        <div class="col-50 padding-vertical">
            <a href="#" class="ripple delete-button">
                <i class="icon f7-icons if-not-md">trash</i>
                <i class="icon material-icons md-only">delete</i>
            </a>
        </div>
    </div>
    `;
    // add slider buttons
    $('.photo-browser-slide .swiper-zoom-container').find('.photo-buttons').remove();
    $('.photo-browser-slide .swiper-zoom-container').append(button);
    $('.delete-button').on('click', DeleteImage);
    $('.like-button').on('click', LikeImage);

    UpdatePhotoSliderButtons();
}


function UpdatePhotoSliderButtons() {
    imagesCaptured.forEach(imageObj => {
        const imageSlide = $(`.photo-browser-slide .swiper-zoom-container img[src="${imageObj.image}"]`);
        const likeButton = imageSlide.next('.photo-buttons').find('.like-button');
        if(imageObj.liked) {
            likeButton.addClass('liked');
        } else {
            likeButton.removeClass('liked');
        }
    });
}

function UpdateGallery() {
    imagesCaptured.forEach(imageObj => {
        const imageCell = $(`#gallery .image-cell img[src="${imageObj.image}"]`);
        const likedButtons = `
            <i class="icon f7-icons if-not-md ">hand_thumbsup</i>
            <i class="icon material-icons md-only">thumb_up</i>
        `
        const cellLiked = imageCell.next('.cell-liked');
        if(imageObj.liked) {
            cellLiked.html(likedButtons);
            cellLiked.addClass('liked');
        } else {
            cellLiked.html('');
            cellLiked.removeClass('liked');
        }
    });
}