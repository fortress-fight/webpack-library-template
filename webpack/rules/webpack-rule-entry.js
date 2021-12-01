/*
 * @Description: webpack rule 的入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 16:52:49
 * @LastEditTime: 2021-12-01 16:55:03
 * @LastEditors: F-Stone
 */
const { styleRules } = require("./webpack-rule-style");

exports.WEBPACK_RULES = [...styleRules]
