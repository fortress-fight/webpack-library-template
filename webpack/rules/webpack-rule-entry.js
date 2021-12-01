/*
 * @Description: webpack rule 的入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 16:52:49
 * @LastEditTime: 2021-12-01 17:43:12
 * @LastEditors: F-Stone
 */
const { assetRules } = require("./webpack-rule-asset");
const { styleRules } = require("./webpack-rule-style");

exports.WEBPACK_RULES = [...styleRules, ...assetRules];
