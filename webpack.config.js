/*
 * @Description: webpack 入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 11:47:27
 * @LastEditTime: 2021-12-01 14:07:37
 * @LastEditors: F-Stone
 */

/* ---------------------------------- */
/*           webpack config           */
/* ---------------------------------- */
const WEBPACK_DEV_CONFIG = require("./webpack/webpack.dev.config");
const WEBPACK_PRO_CONFIG = require("./webpack/webpack.pro.config");
const WEBPACK_DLL_CONFIG = require("./webpack/webpack.dll.config");

let WEBPACK_CONFIG;
if (process.env.PROJECT_PRO_DLL) {
    WEBPACK_CONFIG = WEBPACK_DLL_CONFIG;
} else {
    WEBPACK_CONFIG =
        process.env.NODE_ENV == "development"
            ? WEBPACK_DEV_CONFIG
            : WEBPACK_PRO_CONFIG;
}

module.exports = WEBPACK_CONFIG;
