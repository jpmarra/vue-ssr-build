/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
/* eslint-enable import/no-extraneous-dependencies */

const { isLocal, getBaseConfig } = require('./webpack.base.config');

module.exports = function getMiddlewareConfig(rootDir) {
    const middlewareConfig = merge(getBaseConfig('middleware', rootDir), {
        // Note: This name must begin with 'server' in order to be picked up by the
        // webpack-hot-server-middleware plugin
        name: 'server-middleware',
        entry: './src/server/vue-middleware.js',
        target: 'node',
        node: {
            __dirname: true,
            __filename: true,
        },
        output: {
            filename: 'vue-middleware.js',
            libraryTarget: 'umd',
        },
    });

    if (isLocal) {
        // Wire up HMR on the server
        // Can't use chunkhash while using HMR plugins
        middlewareConfig.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            ...middlewareConfig.plugins,
        ];
    }

    return middlewareConfig;
};
