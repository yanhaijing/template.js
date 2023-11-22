fis.match('**.tmpl', {
  parser: fis.plugin('template', {
    sTag: '<%',
    eTag: '%>',
    global: 'template',
    sandbox: false,
  }),
  isJsLike: true,
  release: false,
});
