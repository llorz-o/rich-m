/** @format */

import {join} from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as config from '../common/constant'

export default {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    entry: join(config.CLI_SITE, 'doc/index.js'),
    plugins: [
        new HtmlWebpackPlugin({
            template: join(config.CLI_SITE, 'doc/index.html'),
        }),
    ],
}
