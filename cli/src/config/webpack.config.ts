const path = require('path')
const vueLoaderPlugin = require('vue-loader/lib/plugin')

import * as constant from '../common/constant'

export default {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: 'ts-loader',
            tsx: 'babel-loader!ts-loader',
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'vue', 'json'],
    alias: {
      '@': path.resolve(constant.ROOT, './'),
      'u@': path.resolve(constant.ROOT, 'utils/'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(constant.ROOT, './dist'),
  },
  plugins: [new vueLoaderPlugin()],
}
