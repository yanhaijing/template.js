var path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tmpl/,
        use: [
          {
            loader: __dirname + '/../../',
            options: {
              sTag: '<#',
              eTag: '#>',
            },
          },
        ],
      },
    ],
  },
};
