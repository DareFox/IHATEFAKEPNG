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
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
              return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".html"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ context: srcDir, from: path.join(srcDir, "*.html")}],
            options: {

            },
        }),
    ],
    devtool: 'inline-source-map',
    mode: 'development'
};