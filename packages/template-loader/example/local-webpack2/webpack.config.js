var path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.tmpl/,
        loader: __dirname + '/../../',
        query: {
          sTag: '<#',
          eTag: '#>',
        },
      },
    ],
  },
};
