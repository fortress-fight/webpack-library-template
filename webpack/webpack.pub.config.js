/*
 * @Description: webpack 开发与生产公用配置文件
 * @Author: F-Stone
 * @Date: 2021-11-30 18:40:01
 * @LastEditTime: 2021-12-16 17:32:43
 * @LastEditors: F-Stone
 */
const path = require("path");
const { HASH_NAME_RULE, SINGLE_FILE } = require("./config/webpack.env");
const {
    SRC_PATH,
    OUT_PATH,
    OUT_FILE_PATH,
    PUBLIC_PATH,
} = require("./config/webpack.path");
const { WEBPACK_ALIAS } = require("./config/webpack.resolve");
const { WEBPACK_PUB_PLUGINS } = require("./plugins/webpack-plugin-entry");
const { WEBPACK_PUB_RULES } = require("./rules/webpack-rule-entry");

const { OUT_JS_PATH, OUT_ASSET_PATH } = OUT_FILE_PATH;

module.exports = {
    target: "web",
    entry: {
        index: { import: path.resolve(SRC_PATH, "app.ts") },
    },
    resolve: {
        alias: WEBPACK_ALIAS,
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: OUT_PATH,
        publicPath: PUBLIC_PATH,
        filename: path.posix.join(OUT_JS_PATH, `${HASH_NAME_RULE}.js`),
        chunkFilename: path.posix.join(OUT_JS_PATH, `${HASH_NAME_RULE}.js`),
        assetModuleFilename: path.posix.join(
            OUT_ASSET_PATH,
            `${HASH_NAME_RULE}.js`
        ),
    },
    plugins: WEBPACK_PUB_PLUGINS,
    module: {
        noParse: [/asset\\plugins\\.+\.js$/, /lodash/],
        rules: WEBPACK_PUB_RULES,
    },
    externals: { jquery: "jQuery" },
    optimization: {
        runtimeChunk: SINGLE_FILE ? false : "single",
        moduleIds: "deterministic",
        splitChunks: {
            chunks:  SINGLE_FILE ? "async": "all",
            name(module, chunks, cacheGroupKey) {
                let moduleFileName = module
                    .identifier()
                    .split(/[\\/]/)
                    .reduceRight((item) => item);
                moduleFileName = moduleFileName.slice(
                    0,
                    moduleFileName.lastIndexOf(".")
                );

                const allChunksNames = chunks
                    .map((item) => item.name)
                    .join("~");
                if (allChunksNames) {
                    return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                } else {
                    return `${cacheGroupKey}-${moduleFileName}`;
                }
            },
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
};
