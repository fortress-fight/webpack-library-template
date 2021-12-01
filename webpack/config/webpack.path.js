/*
 * @Description: webpack 的路径管理
 * @Author: F-Stone
 * @Date: 2021-12-01 13:33:32
 * @LastEditTime: 2021-12-01 16:59:11
 * @LastEditors: F-Stone
 */
const path = require("path");
const { IS_DEV_MODULE } = require("./webpack.env");

/* ---------------------------------- */
/*              BASE_PATH             */
/* ---------------------------------- */
const PUBLIC_PATH = IS_DEV_MODULE ? "/" : "/";
const ROOT_PATH = path.resolve(__dirname, "../../");
const SRC_PATH = path.resolve(ROOT_PATH, "src");
const OUT_PATH = path.resolve(ROOT_PATH, "dist");

/* ---------------------------------- */
/*           ENTRY_FILE_PATH          */
/* ---------------------------------- */
const TEMPLATE_PATH = path.resolve(ROOT_PATH, "pages");

module.exports = {
    ROOT_PATH,
    SRC_PATH,
    OUT_PATH,
    PUBLIC_PATH,
    OUT_FILE_PATH: {
        OUT_JS_PATH: "script",
    },
    ENTRY_FILE_PATH: {
        TEMPLATE_PATH
    }
};
