import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { merge } from 'webpack-merge'
import BaseConf from '../config/webpack.config'
import DemoConf from '../config/demo.config'

const DEMO_CONFIG = merge(BaseConf, DemoConf as Webpack.Configuration)

export default function() {
  // demo 运行在dev页面
  // doc 命令时demo为打包逻辑
  // 所有的组件demo页面按组件文件夹名注入路由
  return new Promise((resolve, reject) => {
    const devServerOptions = {
      hot: true,
      host: 'localhost',
    }

    WebpackDevServer.addDevServerEntrypoints(DEMO_CONFIG, devServerOptions)

    const compiler = Webpack(DEMO_CONFIG)
    const server = new WebpackDevServer(compiler)
    server.listen(5001, 'localhost', (err) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      console.log('dev server run http://localhost:5001')
      resolve()
    })
  })
}