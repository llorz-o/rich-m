const path = require('path')

const merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./webpack.config')

const webpackDevConfig = merge(config, {
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'static/index.html')
        }),
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, './static'),
            to: 'static',
            ignore: ['.*']
        }])
    ]
})

module.exports = webpackDevConfig