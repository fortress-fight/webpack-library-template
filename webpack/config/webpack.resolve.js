/*
 * @Description: 控制 webpack 解析的配置
 * @Author: F-Stone
 * @Date: 2021-12-02 16:30:05
 * @LastEditTime: 2021-12-02 16:32:45
 * @LastEditors: F-Stone
 */

const { SRC_PATH } = require("./webpack.path");

exports.WEBPACK_ALIAS = {
    "@": SRC_PATH,
};
