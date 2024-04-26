const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
      special_offer: './src/Index.ts'
    },
    output: {
        filename: 'games/special_offer/assets/game.js',
        path: __dirname + '/dist',
        libraryTarget: 'var',
        library: 'GameModule'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" },
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};
