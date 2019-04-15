const path = require('path');

exports.app = {
  target: 'web',
  entry: './src/react-app.js',
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules')],   
  }
};