const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require('../webpack.dev')

require('./demo.build').then(() => {

    const options = {
        contentBase: './dist',
        hot: true,
        host: 'localhost'
    }

    webpackDevServer.addDevServerEntrypoints(config, options)

    const compiler = webpack(config)
    const server = new webpackDevServer(compiler, options)

    server.listen(5000, 'localhost', () => {
        console.log('dev server run localhost:5000')
    })

})