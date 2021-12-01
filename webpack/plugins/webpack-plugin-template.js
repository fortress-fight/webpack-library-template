/*
 * @Description: 项目结构模板输出管理
 * @Author: F-Stone
 * @Date: 2021-12-01 14:23:05
 * @LastEditTime: 2021-12-01 15:29:57
 * @LastEditors: F-Stone
 */

const path = require("path");

/* ---------------------------------- */
/*     html-webpack-plugin@^5.5.0     */
/* ---------------------------------- */
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { PAGES_CONFIG } = require("../config/webpack.page");
const { ENTRY_FILE_PATH, PUBLIC_PATH } = require("../config/webpack.path");
const { IS_DEV_MODULE, PROJECT_NAME } = require("../config/webpack.env");
const { TEMPLATE_PATH } = ENTRY_FILE_PATH;

exports.HTML_PLUGINS = PAGES_CONFIG.map(({ name, param, config }) => {
    const DEFAULT_CONFIG = Object.assign(
        {
            title: PROJECT_NAME,
            minify: IS_DEV_MODULE
                ? false
                : {
                      collapseWhitespace: false,
                      keepClosingSlash: true,
                      removeComments: true,
                      removeRedundantAttributes: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      useShortDoctype: true,
                      preserveLineBreaks: true,
                  },
            templateParameters: {
                publicPath: PUBLIC_PATH,
                PROJECT_NAME,
                ...param,
            },
            template: path.resolve(TEMPLATE_PATH, name + ".html"),
            chunks: "all",
            excludeChunks: [],
            filename: name + ".html",
            beautify: {
                "indent-size": 4,
            },
        },
        config
    );
    return new HtmlWebpackPlugin(DEFAULT_CONFIG);
});
