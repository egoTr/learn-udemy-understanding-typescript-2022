const path = require('path');

module.exports = {
    mode: 'production',
    entry: "./ts/app.ts",
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'ts-js'),
    }, // output
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ] // rules
    }, // module
    resolve: {
        extensions: ['.ts', '.js']
    } // resolve
}