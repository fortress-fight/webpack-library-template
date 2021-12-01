/*
 * @Description: webpack-plugin 的入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 14:50:48
 * @LastEditTime: 2021-12-01 15:35:15
 * @LastEditors: F-Stone
 */

const { HTML_PLUGINS } = require("./webpack-plugin-template");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

exports.WEBPACK_PUB_PLUGINS = [
    ...HTML_PLUGINS
]
exports.WEBPACK_PRO_PLUGINS = [
    new CleanWebpackPlugin(),
]
