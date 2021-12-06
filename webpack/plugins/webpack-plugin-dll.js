/*
 * @Description: 添加使用 webpack.DllPlugin 打包出的文件需要的 Plugin
 * @Author: F-Stone
 * @Date: 2021-12-06 16:46:07
 * @LastEditTime: 2021-12-06 17:01:19
 * @LastEditors: F-Stone
 */
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const {
    OUT_DLL_PATH,
    OUT_FILE_PATH,
    PUBLIC_PATH,
} = require("../config/webpack.path");
const { OUT_JS_PATH, OUT_STYLE_PATH } = OUT_FILE_PATH;

const Dll_JSON = fs
    .readdirSync(OUT_DLL_PATH)
    .filter((e) => e.match(/.*\.json$/gi))
    .map((f) => {
        return new webpack.DllReferencePlugin({
            manifest: require(path.resolve(OUT_DLL_PATH, f)),
        });
    });

exports.DLL_PLUGINS = [
    ...Dll_JSON,
    new AddAssetHtmlPlugin([
        {
            filepath: path.resolve(OUT_DLL_PATH, OUT_JS_PATH, "*.js"),
            publicPath: path.posix.join(PUBLIC_PATH, OUT_JS_PATH),
            outputPath: OUT_JS_PATH,
        },
        {
            filepath: path.resolve(OUT_DLL_PATH, OUT_STYLE_PATH, "*.css"),
            publicPath: path.posix.join(PUBLIC_PATH, OUT_STYLE_PATH),
            outputPath: OUT_STYLE_PATH,
        },
    ]),
];
