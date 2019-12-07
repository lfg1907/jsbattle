const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: './frontend/src/index.jsx',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'frontend/assets')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};
