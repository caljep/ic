var WebpackStripLoader = require('strip-loader'),
		devConfig = require('./webpack.config.js');

devConfig.module.loaders.push({
	test: [/\.js$/, /\.es6$/],
	exclude: /node_modules/,
	loader: WebpackStripLoader.loader('console.log')
});

module.exports = devConfig;