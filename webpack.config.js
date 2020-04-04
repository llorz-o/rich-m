const path = require('path')
const vueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    module: {
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        ts: 'ts-loader',
                        tsx: 'babel-loader!ts-loader'
                    }
                }
            }, {
                test: /\.tsx?$/,
                use: ['babel-loader', {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    },

                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: "css-loader"
            }, {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    "less-loader"
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'vue', 'json'],
        alias: {
            "@": path.resolve(__dirname, '.'),
            "u@": path.resolve(__dirname, 'utils/'),
            // "sty": path.resolve(__dirname, 'src/sty/'),
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new vueLoaderPlugin()
    ]
}