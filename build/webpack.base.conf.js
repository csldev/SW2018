const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const webpack = require('webpack');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'rev-list HEAD --count --no-merges',
});

const vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: './src/app.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: resolve('./src'), to: resolve('./dist'), toType: 'dir',
    }]),
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist',
      files: ['./utils/settings.js'],
      rules: [{
        search: '@version',
        replace: gitRevisionPlugin.version(),
      }],
    }]),
  ],
};
