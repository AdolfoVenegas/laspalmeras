const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development', // o 'production'
    entry: {
        app: './app.js',
        cookie: './cookie.js',
        fade_from: './fade-from.js',
        fechas: './fechas.js',
        particles: './particles.js',
    },
    output: {
        filename: '[name].main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        static: './dist',
        port: 9000
    },
    devtool: 'source-map'
};
