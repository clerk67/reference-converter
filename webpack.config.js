const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'reference-converter.min.js',
    path: path.join(__dirname, 'dist'),
  },
};
