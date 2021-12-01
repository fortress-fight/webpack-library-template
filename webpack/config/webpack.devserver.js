/*
 * @Description: webpack server 配置
 * @Author: F-Stone
 * @Date: 2021-12-01 19:36:35
 * @LastEditTime: 2021-12-02 02:25:04
 * @LastEditors: F-Stone
 */
const path = require("path");

const { PUBLIC_PATH, ROOT_PATH, STATIC_PATH, ENTRY_FILE_PATH } = require("./webpack.path");

exports.WEBPACK_DEV_SERVER = {
    open: true,
    hot: true,
    compress: true,
    watchFiles: {
        paths: [path.join(ENTRY_FILE_PATH.TEMPLATE_PATH, "*")]
    },
    proxy: {},
    static: [
        {
            directory: STATIC_PATH,
            publicPath: PUBLIC_PATH,
            watch: {
                poll: 1000,
                aggregateTimeout: 500,
                ignored: [
                    path.resolve(ROOT_PATH, "node_modules"),
                    path.resolve(ROOT_PATH, "dist"),
                ],
            },
        }
    ],
    client: {
        overlay: { errors: true, warnings: false },
    },
    allowedHosts: "all",
    historyApiFallback: {
        rewrites: [
            { from: /404/, to: "/404.html" }
        ]
    }
};
