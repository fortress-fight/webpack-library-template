/*
 * @Description: webpack 的路径管理
 * @Author: F-Stone
 * @Date: 2021-12-01 13:33:32
 * @LastEditTime: 2021-12-01 14:08:21
 * @LastEditors: F-Stone
 */
const path = require("path");
const { IS_DEV_MODULE } = require("./webpack.env");

const ROOT_PATH = path.resolve(__dirname, "../../");
const SRC_PATH = path.resolve(ROOT_PATH, "src");
const OUT_PATH = path.resolve(ROOT_PATH, "dist");
const PUBLIC_PATH = IS_DEV_MODULE ? "/" : "/";

module.exports = {
    ROOT_PATH,
    SRC_PATH,
    OUT_PATH,
    PUBLIC_PATH,
    OUT_FILE_PATH: {
        OUT_JS_PATH: "script",
    },
};
