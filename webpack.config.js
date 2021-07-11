const path = require('path');
const NodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

/**
 * @type {import('webpack').Configuration}
 */

module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js'],
	},
	mode: 'production',
	target: 'node',
	externalsPresets: { node: true },
	externals: [NodeExternals()],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
		],
	},
	plugins: [ new DotenvPlugin(), new CleanWebpackPlugin(),],
};
