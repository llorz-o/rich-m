const path = require('path')

const merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const conf = require('./webpack.config')

const webpackDemoProdConfig = merge(conf, {
    mode: "development",
    devtool: "source-map",
    entry: "./demoSrc/index.js",
    watch: true,
    watchOptions: {
        ignored: ['node_modules'],
        // poll:1000
    },
    output: {
        path: path.resolve(__dirname, "./static/demo"),
        filename: "js/[name].[chunkhash].js"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'static/index.demo.html')
        }),
    ]
})

module.exports = webpackDemoProdConfig