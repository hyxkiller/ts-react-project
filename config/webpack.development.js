const { join } = require('path');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


module.exports = {
    mode: 'development',
    devtool: "cheap-module-eval-source-map",
    output: {
        publicPath: '/',
        // sourceMapFilename: "[name].js",
    },
    devServer: {
        historyApiFallback: true,
        // contentBase: join(__dirname, '../dist'),
        proxy: {
            '/api': {
                target: 'http://47.92.88.235:8082/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/api": ""
                }
            },
        },
        // host: "0.0.0.0",
        hot: true,
        port: '7000',
        // openPage: 'banner',
        progress: true,
    },
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: "My Project Webpack Build",
            // logo: path.resolve("./img/favicon.png"),
            suppressSuccess: true
        }),
        new FriendlyErrorsWebpackPlugin(),
    ]
}