fis.match('**.tmpl', {
    parser: fis.plugin('template', {
        sTag: '<%',
        eTag: '%>',
        global: 'template'
    }),
    isJsLike: true,
    release : false
});
