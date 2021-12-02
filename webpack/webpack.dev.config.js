/*
 * @Description: webpack 开发配置文件
 * @Author: F-Stone
 * @Date: 2021-11-30 18:39:28
 * @LastEditTime: 2021-12-02 14:07:31
 * @LastEditors: F-Stone
 */
const { merge } = require("webpack-merge");
const { WEBPACK_DEV_SERVER } = require("./config/webpack.devserver");
const { WEBPACK_DEV_PLUGINS } = require("./plugins/webpack-plugin-entry");
const { WEBPACK_DEV_RULES } = require("./rules/webpack-rule-entry");
const PUB_CONFIG = require("./webpack.pub.config");

module.exports = (env, argv) => {
    return merge(PUB_CONFIG, {
        stats: {
            preset: "minimal",
            colors: true,
        },
        mode: "development",
        devtool: "eval-source-map",
        devServer: WEBPACK_DEV_SERVER,
        plugins: WEBPACK_DEV_PLUGINS,
        module: {
            rules: WEBPACK_DEV_RULES,
        },
    });
};
