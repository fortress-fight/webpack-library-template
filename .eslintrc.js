/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-12-06 18:01:07
 * @LastEditTime: 2021-12-06 18:23:26
 * @LastEditors: F-Stone
 */

module.exports = {
    root: true,
    parserOptions: { ecmaVersion: 2020, sourceType: "module" },
    env: { es6: true, browser: true, node: true },
    extends: ["eslint:recommended"],
    rules: {
        "no-console": "off",
        "no-debugger": "off",
    },
    globals: {},
};
