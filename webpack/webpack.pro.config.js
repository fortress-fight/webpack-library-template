/*
 * @Description: webpack 生产配置文件
 * @Author: F-Stone
 * @Date: 2021-11-30 18:39:40
 * @LastEditTime: 2021-12-02 11:58:51
 * @LastEditors: F-Stone
 */
const { merge } = require("webpack-merge");
const { WEBPACK_PRO_PLUGINS } = require("./plugins/webpack-plugin-entry");
const { WEBPACK_PRO_RULES } = require("./rules/webpack-rule-entry");
const PUB_CONFIG = require("./webpack.pub.config");

module.exports = (env, argv) => {
    return merge(PUB_CONFIG, {
        mode: "production",
        devtool: false,
        plugins: WEBPACK_PRO_PLUGINS,
        module: {
            rules: WEBPACK_PRO_RULES,
        },
    });
};
