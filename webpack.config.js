// console.log('haa', process.argv);
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);

const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const { join, resolve } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _modeflag = _mode == 'production';

const webpackConfig = {
	entry: {
		app: resolve("./src/web/index.tsx")
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			assets: resolve(__dirname, './src/web/assets'),
			styles: resolve(__dirname, './src/web/styles'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				include: [resolve('src')],
				exclude: /node_modules/,
				use: "babel-loader"
				// loader: "awesome-typescript-loader"
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: _modeflag ? MiniCssExtractPlugin.loader : 'style-loader',
					},
					{
						loader: 'css-loader'
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							ident: 'postcss',
							plugins: () => [
								require('postcss-flexbugs-fixes'),
								autoprefixer({
									browsers: [
										'>1%',
										'last 4 versions',
										'Firefox ESR',
										'not ie < 9', // React doesn't support IE8 anyway
									],
									flexbox: 'no-2009',
								}),
							],
						},
					},
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'static/media/[name].[hash:8].[ext]'
						}
					},
				],
			},
			{
				test: /\.scss$/,
				loaders: [
					{
						loader: _modeflag ? MiniCssExtractPlugin.loader : 'style-loader',
					}, 'css-loader', 'sass-loader'],
				include: [resolve('src')],
				exclude: /node_nodules/,
			}
		]
	},
	stats: {
		builtAt: true,
	},
	plugins: [
		new CheckerPlugin(),
		new HtmlWebpackPlugin({
			template: join(__dirname, '/src/web/index.html'),
			filename: 'index.html',
			inject: true,
			minify: {
				removeComments: true, // 移除注释
				collapseWhitespace: true, // 合并空格
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
		}),
		new MiniCssExtractPlugin({
			filename: _modeflag ? 'static/css/[name].[hash:5].css' : 'styles/[name].css',
			chunkFilename: _modeflag ? 'static/css/[name].[hash:5].css' : 'styles/[name].css',
		}),
		new webpack.HashedModuleIdsPlugin(),
	]
}
module.exports = merge(webpackConfig, _mergeConfig);