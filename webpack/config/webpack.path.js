/*
 * @Description: webpack 的路径管理
 * @Author: F-Stone
 * @Date: 2021-12-01 13:33:32
 * @LastEditTime: 2021-12-02 12:06:01
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
const STATIC_PATH = path.resolve(ROOT_PATH, "public");

/* ---------------------------------- */
/*           ENTRY_FILE_PATH          */
/* ---------------------------------- */
const TEMPLATE_PATH = path.resolve(ROOT_PATH, "pages");

module.exports = {
    ROOT_PATH,
    SRC_PATH,
    OUT_PATH,
    PUBLIC_PATH,
    STATIC_PATH,
    OUT_FILE_PATH: {
        OUT_JS_PATH: "script",
        OUT_IMG_PATH: "images",
        OUT_FONT_PATH: "fonts",
        OUT_MEDIA_PATH: "medias",
        OUT_ASSET_PATH: "assets",
        OUT_STYLE_PATH: "style",
    },
    ENTRY_FILE_PATH: {
        TEMPLATE_PATH,
    }
};
