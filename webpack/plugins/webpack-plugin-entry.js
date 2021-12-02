/*
 * @Description: webpack-plugin 的入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 14:50:48
 * @LastEditTime: 2021-12-02 15:05:41
 * @LastEditors: F-Stone
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const { name } = require("../../package.json");
const { HTML_PLUGINS } = require("./webpack-plugin-template");
const {
    OUT_FILE_PATH,
    ROOT_PATH,
    OUT_PATH,
} = require("../config/webpack.path");
const { HASH_NAME_RULE } = require("../config/webpack.env");

const { OUT_STYLE_PATH } = OUT_FILE_PATH;

exports.WEBPACK_PUB_PLUGINS = [
    ...HTML_PLUGINS,
    new WebpackBuildNotifierPlugin({
        title: name,
        showDuration: true,
    }),
];
exports.WEBPACK_PRO_PLUGINS = [
    new MiniCssExtractPlugin({
        filename: path.posix.join(OUT_STYLE_PATH, `${HASH_NAME_RULE}.css`),
        chunkFilename: path.posix.join(OUT_STYLE_PATH, `${HASH_NAME_RULE}.css`),
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
        patterns: [
            {
                from: path.resolve(ROOT_PATH, "public"),
                to: OUT_PATH,
                toType: "dir",
                globOptions: {
                    ignore: [".DS_Store", "**/.gitkeep"],
                },
                noErrorOnMissing: true,
            },
        ],
    }),
];
exports.WEBPACK_DEV_PLUGINS = [];
