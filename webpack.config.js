const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './www/js/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'www/js/dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
