const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "src");

module.exports = {
    entry: {
      background: path.join(srcDir, 'background.ts'),
      optionsHtmlHandler: path.join(srcDir, 'optionsHtmlHandler.ts'),
    //   optionsHtml: path.join(srcDir, 'options.html')
    },
    output: {
        path: path.join(__dirname, "./out"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
                include: /node_modules\/webextensions-polyfill|src/
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".html"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ context: srcDir, from: path.join(srcDir, "options.html")}, { context: srcDir, from: path.join(srcDir, "background.html")}],
            options: {

            },
        }),
    ],
    devtool: 'inline-source-map',
    mode: 'development'
};