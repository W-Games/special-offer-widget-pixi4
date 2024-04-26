module.exports = {
    devtool: "source-map",
    entry: {
        special_offer: './src/Index.ts'
    },
    output: {
        filename: "./games/special_offer/assets/game.js",
        path: __dirname + '/output',
        libraryTarget: 'var',
        library: 'GameModule'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" },
        ],
    },
}