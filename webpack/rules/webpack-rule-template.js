/*
 * @Description: 加载模块 loader
 * @Author: F-Stone
 * @Date: 2021-12-02 17:42:12
 * @LastEditTime: 2021-12-02 17:46:06
 * @LastEditors: F-Stone
 */

exports.ejsRules = [
    {
        test: /\.ejs$/,
        use: [
            {
                loader: "ejs-compiled-loader",
                options: {
                    beautify: true,
                    htmlmin: true,
                    htmlminOptions: {
                        removeComments: true,
                    },
                },
            },
        ],
    },
];
