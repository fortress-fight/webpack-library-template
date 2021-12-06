/*
 * @Description: webpack rule 的入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 16:52:49
 * @LastEditTime: 2021-12-06 16:33:05
 * @LastEditors: F-Stone
 */
const { assetRules } = require("./webpack-rule-asset");
const { jsRules, tsRules } = require("./webpack-rule-script");
const { cssRules, sassRules } = require("./webpack-rule-style");
const { ejsRules } = require("./webpack-rule-template");

exports.WEBPACK_PUB_RULES = [
    ...assetRules,
    ...ejsRules,
    ...jsRules,
    ...tsRules,
    ...cssRules,
    ...sassRules,
];
exports.WEBPACK_DEV_RULES = [];
exports.WEBPACK_PRO_RULES = [];
exports.WEBPACK_DLL_RULES = [...assetRules, ...cssRules, ...tsRules];
