const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.tmpl/,
        use: [
          {
            loader: 'templatejs-loader',
            options: {
              sTag: '<%',
              eTag: '%>',
            },
          },
        ],
      },
    ],
  },
};
