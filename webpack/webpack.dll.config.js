/*
 * @Description: webpack dll 打包配置
 * @Author: F-Stone
 * @Date: 2021-12-01 15:01:02
 * @LastEditTime: 2021-12-06 17:25:32
 * @LastEditors: F-Stone
 */
const path = require("path");

const { DLL_NAME_RULE } = require("./config/webpack.env");
const { WEBPACK_MINIMIZE } = require("./config/webpack.min");
const {
    OUT_DLL_PATH,
    PUBLIC_PATH,
    OUT_FILE_PATH,
} = require("./config/webpack.path");
const { WEBPACK_DLL_PLUGINS } = require("./plugins/webpack-plugin-entry");
const { WEBPACK_DLL_RULES } = require("./rules/webpack-rule-entry");

module.exports = (env, argv) => {
    return {
        mode: "production",
        entry: { vendor: ["lodash"] },
        output: {
            publicPath: PUBLIC_PATH,
            filename: path.posix.join(
                OUT_FILE_PATH.OUT_JS_PATH,
                `${DLL_NAME_RULE}.js`
            ),
            path: OUT_DLL_PATH,
            library: DLL_NAME_RULE,
        },
        devtool: false,
        plugins: WEBPACK_DLL_PLUGINS,
        module: { rules: WEBPACK_DLL_RULES },
        optimization: {
            moduleIds: "deterministic",
            ...WEBPACK_MINIMIZE,
            removeAvailableModules: true,
        },
    };
};
