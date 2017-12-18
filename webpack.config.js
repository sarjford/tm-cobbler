const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/i,
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: [
            ['transform-react-jsx', { pragma: 'h' }]
          ]
        }
      }
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    compress: true,
    historyApiFallback: true
  }
}
