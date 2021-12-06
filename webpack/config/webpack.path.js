/*
 * @Description: webpack 的路径管理
 * @Author: F-Stone
 * @Date: 2021-12-01 13:33:32
 * @LastEditTime: 2021-12-06 16:29:33
 * @LastEditors: F-Stone
 */
const path = require("path");
const { IS_DEV_MODE } = require("./webpack.env");

/* ---------------------------------- */
/*              BASE_PATH             */
/* ---------------------------------- */
const PUBLIC_PATH = IS_DEV_MODE ? "/" : "/";
const ROOT_PATH = path.resolve(__dirname, "../../");
const SRC_PATH = path.resolve(ROOT_PATH, "src");
const OUT_PATH = path.resolve(ROOT_PATH, "dist");
const OUT_DLL_PATH = path.resolve(ROOT_PATH, "dll");
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
    OUT_DLL_PATH,
    ENTRY_FILE_PATH: {
        TEMPLATE_PATH,
    }
};
