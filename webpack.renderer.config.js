const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.(png|jpg|svg|jpeg|gif)$/i,
  use: [
      {
          loader: 'file-loader',
          options: {
              name: 'img/[name].[ext]',
              publicPath: '../.'
          }
      },
  ],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};
