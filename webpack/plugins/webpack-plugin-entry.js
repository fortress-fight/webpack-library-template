/*
 * @Description: webpack-plugin 的入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 14:50:48
 * @LastEditTime: 2021-12-06 17:59:43
 * @LastEditors: F-Stone
 */
const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const { name } = require("../../package.json");
const { HTML_PLUGINS } = require("./webpack-plugin-template");
const {
    OUT_FILE_PATH,
    ROOT_PATH,
    OUT_PATH,
    OUT_DLL_PATH,
} = require("../config/webpack.path");
const {
    HASH_NAME_RULE,
    ANALYZER,
    IS_DEV_MODE,
    DLL_NAME_RULE,
    USE_THREAD_LOADER,
} = require("../config/webpack.env");
const { DLL_PLUGINS } = require("./webpack-plugin-dll");

const { OUT_STYLE_PATH } = OUT_FILE_PATH;

exports.WEBPACK_PUB_PLUGINS = [
    ...HTML_PLUGINS,
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
        title: name,
        showDuration: true,
    }),
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env.IS_DEV_MODE": JSON.stringify(IS_DEV_MODE),
    }),
    ...DLL_PLUGINS,
    new ESLintPlugin({
        context: ROOT_PATH,
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        emitWarning: false,
        lintDirtyModulesOnly: true,
        threads: USE_THREAD_LOADER,
    }),
];

exports.WEBPACK_PRO_PLUGINS = [
    new MiniCssExtractPlugin({
        filename: path.posix.join(OUT_STYLE_PATH, `${HASH_NAME_RULE}.css`),
        chunkFilename: path.posix.join(OUT_STYLE_PATH, `${HASH_NAME_RULE}.css`),
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
        patterns: [
            {
                from: path.resolve(ROOT_PATH, "public"),
                to: OUT_PATH,
                toType: "dir",
                globOptions: {
                    ignore: [".DS_Store", "**/.gitkeep"],
                },
                noErrorOnMissing: true,
            },
        ],
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: ANALYZER || "disabled",
        generateStatsFile: ANALYZER,
    }),
];

exports.WEBPACK_DEV_PLUGINS = [new ForkTsCheckerWebpackPlugin()];

exports.WEBPACK_DLL_PLUGINS = [
    new WebpackBuildNotifierPlugin({ title: name, showDuration: true }),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
        filename: path.posix.join(OUT_STYLE_PATH, `${DLL_NAME_RULE}.css`),
        chunkFilename: path.posix.join(OUT_STYLE_PATH, `${DLL_NAME_RULE}.css`),
    }),
    new webpack.DllPlugin({
        name: DLL_NAME_RULE,
        path: path.resolve(OUT_DLL_PATH, "[name]_manifest.json"),
    }),
];
