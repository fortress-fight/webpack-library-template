/*
 * @Description: script 的处理
 * @Author: F-Stone
 * @Date: 2021-12-02 17:59:03
 * @LastEditTime: 2021-12-02 18:07:56
 * @LastEditors: F-Stone
 */

exports.jsRules = [
    {
        test: /\.m?js$/,
        exclude: [
            /(node_modules|bower_components)/,
            /asset\\plugins\\.+\.js$/
        ],
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
