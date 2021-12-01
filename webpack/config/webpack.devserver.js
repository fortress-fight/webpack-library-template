/*
 * @Description: webpack server 配置
 * @Author: F-Stone
 * @Date: 2021-12-01 19:36:35
 * @LastEditTime: 2021-12-01 20:17:28
 * @LastEditors: F-Stone
 */
const path = require("path");

const { PUBLIC_PATH, ROOT_PATH } = require("./webpack.path");

exports.WEBPACK_DEV_SERVER = {
    open: true,
    hot: true,
    static: {
        publicPath: PUBLIC_PATH,
        watch: {
            poll: 1000,
            aggregateTimeout: 500,
            ignored: [
                path.resolve(ROOT_PATH, "node_modules"),
                path.resolve(ROOT_PATH, "dist"),
            ],
        },
    },
    client: {
        overlay: { errors: true, warnings: false },
    },
    allowedHosts: "all",
};
