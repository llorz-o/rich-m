const path = require('path')

const merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./webpack.config')

const webpackProdConfig = merge(config, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
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

module.exports = webpackProdConfig