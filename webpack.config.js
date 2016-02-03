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
    ],
    devtool: 'source-map'
}