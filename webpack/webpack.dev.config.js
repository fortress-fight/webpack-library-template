/*
 * @Description: webpack 开发配置文件
 * @Author: F-Stone
 * @Date: 2021-11-30 18:39:28
 * @LastEditTime: 2021-12-01 19:37:45
 * @LastEditors: F-Stone
 */
const { merge } = require("webpack-merge");
const { WEBPACK_DEV_SERVER } = require("./config/webpack.devserver");
const PUB_CONFIG = require("./webpack.pub.config");

module.exports = (env, argv) => {
    return merge(PUB_CONFIG, {
        target: "web",
        mode: "development",
        devtool: "eval-source-map",
        devServer: WEBPACK_DEV_SERVER,
    });
};
