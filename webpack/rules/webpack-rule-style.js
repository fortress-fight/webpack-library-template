/*
 * @Description: webpack style 处理
 * @Author: F-Stone
 * @Date: 2021-12-01 16:49:04
 * @LastEditTime: 2021-12-02 12:32:04
 * @LastEditors: F-Stone
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { OUT_FILE_PATH } = require("../config/webpack.path");

exports.devStyleRules = [
    {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
    },
];

exports.proStyleRules = [
    {
        test: /\.css$/i,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // 当使用相对路径时，如果采用绝对路径（webpackOptions.output 中的 publicPath），使用默认行为即可
                    publicPath: path.posix.join(
                        path.relative(OUT_FILE_PATH.OUT_STYLE_PATH, ""),
                        "/"
                    ),
                },
            },
            "css-loader",
        ],
    },
];
