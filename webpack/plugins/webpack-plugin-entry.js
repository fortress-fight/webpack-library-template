/*
 * @Description: webpack-plugin 的入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 14:50:48
 * @LastEditTime: 2021-12-06 16:12:02
 * @LastEditors: F-Stone
 */
const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const { name } = require("../../package.json");
const { HTML_PLUGINS } = require("./webpack-plugin-template");
const {
    OUT_FILE_PATH,
    ROOT_PATH,
    OUT_PATH,
} = require("../config/webpack.path");
const {
    HASH_NAME_RULE,
    ANALYZER,
    IS_DEV_MODE,
} = require("../config/webpack.env");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

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
