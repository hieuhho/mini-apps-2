const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client', 'index.js'),

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        }
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};