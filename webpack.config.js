module.exports = {
    context: __dirname + '/src',
    entry: {
        mainPage    : './main.js',
        // pageOne     : ['./one.js', './two.js'],
        pageOne     : ['./one.js'],
        vendors: ['essential-wire']
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