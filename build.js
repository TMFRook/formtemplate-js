({
    baseUrl: 'app',
    name: 'vendor/almond',
    include: 'main',
    out: 'build/apihelper.min.js',
    wrap: true,
    paths: {
        'jquery': 'vendor/jquery-2.0.3.min',
        'uritemplate': 'vendor/uritemplate-0.3.4.min',
    }
})