/** @format */

import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import {merge} from 'webpack-merge'
import BaseConf from '../config/webpack.config'
import DevConf from '../config/dev.config'
import {getPort} from 'portfinder'

const DEV_CONFIG = merge(BaseConf as Webpack.Configuration, DevConf as Webpack.Configuration)

export default function() {
    // 运行dev开发页面
    return new Promise((resolve, reject) => {
        const devServerOptions = {
            host: '0.0.0.0',
            disableHostCheck: true,
            useLocalIp: true,
        }

        WebpackDevServer.addDevServerEntrypoints(DEV_CONFIG, devServerOptions as Webpack.Configuration)

        const compiler = Webpack(DEV_CONFIG)
        const server = new WebpackDevServer(compiler)
        getPort(
            {
                port: 8080,
            },
            (err, port) => {
                if (err) return console.error(err)

                server.listen(port, '0.0.0.0', err => {
                    if (err) return reject(err)
                    console.log(`开发服务运行于 http://localhost:${port}`)
                    resolve()
                })
            },
        )
    })
}
