/*
 * @Description: webpack 开发与生产公用配置文件
 * @Author: F-Stone
 * @Date: 2021-11-30 18:40:01
 * @LastEditTime: 2021-12-02 14:04:22
 * @LastEditors: F-Stone
 */
const path = require("path");
const { HASH_NAME_RULE } = require("./config/webpack.env");
const {
    SRC_PATH,
    OUT_PATH,
    OUT_FILE_PATH,
    PUBLIC_PATH,
} = require("./config/webpack.path");
const { WEBPACK_PUB_PLUGINS } = require("./plugins/webpack-plugin-entry");
const { WEBPACK_PUB_RULES } = require("./rules/webpack-rule-entry");

const { OUT_JS_PATH, OUT_ASSET_PATH } = OUT_FILE_PATH;

module.exports = {
    target: "web",
    entry: {
        index: {
            import: path.resolve(SRC_PATH, "app.js"),
            dependOn: "share",
        },
        another: {
            import: path.resolve(SRC_PATH, "another.js"),
            dependOn: "share",
        },
        share: "lodash",
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
    optimization: {
        splitChunks: {
            chunks: "all",
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
                return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            },
        },
        runtimeChunk: "single",
    },
};
