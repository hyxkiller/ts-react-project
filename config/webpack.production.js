const path = require('path');

module.exports = {
    mode: 'production',
    output: {
        publicPath: path.resolve(__dirname, '../build'),
        path: path.resolve(__dirname, '../build'),
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    },
    bail: true
}