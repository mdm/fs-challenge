let webpack = require('webpack');
let path = require('path');

let BUILD_DIR = path.resolve(__dirname, 'public');
let APP_DIR = path.resolve(__dirname, 'src');

let config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader'
            },
            {
                test : /\.css/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};

module.exports = config;