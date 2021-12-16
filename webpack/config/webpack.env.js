/*
 * @Description: webpack 的变量管理
 * @Author: F-Stone
 * @Date: 2021-12-01 13:32:32
 * @LastEditTime: 2021-12-16 17:26:18
 * @LastEditors: F-Stone
 */
const { name: PROJECT_NAME } = require("../../package.json");

const HASH_NAME = false;
const HASH_NAME_RULE = HASH_NAME ? "[name]_[contenthash:8]" : "[name]";
const DLL_NAME_RULE = HASH_NAME ? "[name]_dll_[fullhash:8]" : "[name]_dll";

const IS_DEV_MODE = process.env.NODE_ENV == "development";
const ANALYZER = process.env.ANALYZER;
const USE_THREAD_LOADER = false;

// 是否输出独立文件
const SINGLE_FILE = true;
const LIB_NAME = "MyLibrary";

module.exports = {
    HASH_NAME,
    HASH_NAME_RULE,
    IS_DEV_MODE,
    PROJECT_NAME,
    ANALYZER,
    USE_THREAD_LOADER,
    DLL_NAME_RULE,
    SINGLE_FILE,
    LIB_NAME
};
