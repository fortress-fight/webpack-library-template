/*
 * @Description: webpack 的变量管理
 * @Author: F-Stone
 * @Date: 2021-12-01 13:32:32
 * @LastEditTime: 2021-12-02 16:15:34
 * @LastEditors: F-Stone
 */
const {name: PROJECT_NAME} = require("../../package.json");

const HASH_NAME = true;
const HASH_NAME_RULE = HASH_NAME ? "[name].[contenthash:8]" : "[name]"

const IS_DEV_MODE = process.env.NODE_ENV == "development";
const ANALYZER = process.env.ANALYZER;

module.exports = {
    HASH_NAME,
    HASH_NAME_RULE,
    IS_DEV_MODE,
    PROJECT_NAME,
    ANALYZER
}
