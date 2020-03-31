module.exports = async ({ config }) => {
  // for view source addon
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  })

  // vue loaders
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'sass-loader'
    ]
  })

  // for package
  config.resolve.alias['@'] = __dirname + '/../index.js'

  return config
}
