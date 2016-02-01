module.exports = {
    context: __dirname + '/src',
    entry: {
        mainPage    : './main.js',
        pageOne     : './one.js',
    },
    output: {
        filename: './build/[name].bundle.js'
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