module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /${node_modules}/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
}
