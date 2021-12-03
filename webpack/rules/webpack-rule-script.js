/*
 * @Description: script 的处理
 * @Author: F-Stone
 * @Date: 2021-12-02 17:59:03
 * @LastEditTime: 2021-12-03 15:00:10
 * @LastEditors: F-Stone
 */

const { SRC_PATH } = require("../config/webpack.path");

exports.jsRules = [
    {
        test: /\.m?js$/,
        exclude: [
            /(node_modules|bower_components)/,
            /asset\\plugins\\.+\.js$/
        ],
        include: SRC_PATH,
        use: {
            loader: "babel-loader",
            options: {
                cacheDirectory: true,
                presets: ["@babel/preset-env"],
                plugins: ['@babel/plugin-transform-runtime']
            },
        },
    },
];
