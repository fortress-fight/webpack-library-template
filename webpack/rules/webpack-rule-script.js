/*
 * @Description: script 的处理
 * @Author: F-Stone
 * @Date: 2021-12-02 17:59:03
 * @LastEditTime: 2021-12-06 14:35:36
 * @LastEditors: F-Stone
 */

const { USE_THREAD_LOADER, IS_DEV_MODE } = require("../config/webpack.env");
const { SRC_PATH } = require("../config/webpack.path");

let dealJsUseLoader = [
    {
        loader: "babel-loader",
        options: {
            cacheDirectory: true,
            presets: [["@babel/preset-env", { modules: false }]],
            plugins: ["@babel/plugin-transform-runtime"],
        },
    },
];

if (USE_THREAD_LOADER && IS_DEV_MODE) {
    dealJsUseLoader.unshift("thread-loader");
}

exports.jsRules = [
    {
        test: /\.m?js$/,
        exclude: [/(node_modules|bower_components)/, /asset\\plugins\\.+\.js$/],
        include: SRC_PATH,
        use: dealJsUseLoader,
    },
];

exports.tsRules = [
    {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [/(node_modules|bower_components)/],
    },
];

