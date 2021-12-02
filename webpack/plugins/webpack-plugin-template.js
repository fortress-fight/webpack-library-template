/*
 * @Description: 项目结构模板输出管理
 * @Author: F-Stone
 * @Date: 2021-12-01 14:23:05
 * @LastEditTime: 2021-12-02 17:51:42
 * @LastEditors: F-Stone
 */

const path = require("path");

/* ---------------------------------- */
/*     html-webpack-plugin@^5.5.0     */
/* ---------------------------------- */
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { PAGES_CONFIG, TEMPLATE_EXT } = require("../config/webpack.page");
const {
    ENTRY_FILE_PATH,
    PUBLIC_PATH,
    OUT_FILE_PATH,
} = require("../config/webpack.path");
const { IS_DEV_MODE, PROJECT_NAME } = require("../config/webpack.env");
const { testFileIsExit } = require("../../utils/test-file-exit");
const { createFile } = require("../../utils/create-file");
const { TEMPLATE_PATH } = ENTRY_FILE_PATH;

async function testTemplateIsExit(filename) {
    try {
        await testFileIsExit(filename);
    } catch (error) {
        await createFile(filename, "")
            .then()
            .catch((err) => {
                console.log("err:", err);
            });
    }
}

exports.HTML_PLUGINS = PAGES_CONFIG.map(({ name, param, config }) => {
    const templateFilename = path.resolve(TEMPLATE_PATH, name + TEMPLATE_EXT);

    testTemplateIsExit(templateFilename);

    const DEFAULT_CONFIG = Object.assign(
        {
            title: PROJECT_NAME,
            minify: IS_DEV_MODE
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
                IMG_PATH: OUT_FILE_PATH.OUT_IMG_PATH,
                ...param,
            },
            template: templateFilename,
            chunks: "all",
            excludeChunks: [],
            filename: name + '.html',
            beautify: {
                "indent-size": 4,
            },
        },
        config
    );
    return new HtmlWebpackPlugin(DEFAULT_CONFIG);
});
