var webpack = require('webpack');

module.exports = {
  entry: [
    __dirname + '/src/index.js',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000'
  ],
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /${node_modules}/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
