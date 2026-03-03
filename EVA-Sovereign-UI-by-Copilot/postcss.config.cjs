module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        'defaults',
        'last 2 versions',
        'not dead'
      ]
    })
  ]
};
