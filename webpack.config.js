// in this branch plugins/express/routing/config/webpack.page.config.js in use!

var webpack = require('webpack');

var NODE_ENV = process.env.NODE_ENV;

module.exports = {
    context: __dirname + '/src',
    entry: {
        client    : './client/index.js'
    },
    output: {
        filename: './public/build/bundle.js'
    },
    module: {
        loaders: [
            {   
                test: /\.js$/, 
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin('NODE_ENV'),
        new webpack.DefinePlugin({
            LANG: JSON.stringify('ru')
        })
    ],
    devtool: 'source-map'
}