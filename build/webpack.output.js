const path = require('path');

exports.app = {
  dev: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../public/scripts/'),
    library: 'app'
  },
  prod: {
    filename: '[name].min.js',
    chunkFilename: '[name].min.js',
    path: path.resolve(__dirname, '../public/scripts/'),
    library: 'app'
  }
}
