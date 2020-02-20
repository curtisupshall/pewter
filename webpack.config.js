module.exports = {
    entry: './demo/src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/demo/dist',
        publicPath: '/demo/dist'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    devServer: {
        historyApiFallback: true
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },

            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

            {
                test: /\.(jpg|jpeg|png|svg|ttf|woff2?|eot|webmanifest)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        // context: 'src/client/assets',
                    },
                },
            },

            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader?url=false' },
                    { loader: 'resolve-url-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};
