const webpack = require('webpack')

const config = require('../../webpack.prod')

webpack(config, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, //如果使用 ts-loader ，设置这里为true 使构建期间显示 typescript 错误（针对typescript）
        chunks: true,
        chunkModules: false
    }) + '\n\n')
})