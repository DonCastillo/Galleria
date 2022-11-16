var app = new Framework7({
    el: '#app',
    name: 'Galleria',
    id: 'com.myapp.galleria',
    routes: [
        {
            path: '/',
            url: 'index.html'
        },
        {
            path: '/about',
            url: 'pages/about.html'
        },
    ]
});

var mainView = app.views.create('.view-main');