module.exports = {
    context: __dirname + '/src',
    entry: {
        mainPage    : './main.js'
    },
    output: {
        filename: './build/bundle.js'
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