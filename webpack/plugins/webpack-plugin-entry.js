/*
 * @Description: webpack-plugin 的入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 14:50:48
 * @LastEditTime: 2021-12-02 12:32:41
 * @LastEditors: F-Stone
 */
const path = require("path");
const { HTML_PLUGINS } = require("./webpack-plugin-template");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { OUT_FILE_PATH } = require("../config/webpack.path");
const { HASH_NAME_RULE } = require("../config/webpack.env");

const { OUT_STYLE_PATH } = OUT_FILE_PATH;

exports.WEBPACK_PUB_PLUGINS = [...HTML_PLUGINS];
exports.WEBPACK_PRO_PLUGINS = [
    new MiniCssExtractPlugin({
        filename: path.posix.join(OUT_STYLE_PATH, `${HASH_NAME_RULE}.css`),
        chunkFilename: path.posix.join(OUT_STYLE_PATH, `${HASH_NAME_RULE}.css`),
    }),
    new CleanWebpackPlugin(),
];
exports.WEBPACK_DEV_PLUGINS = [];
