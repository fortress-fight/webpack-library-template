/*
 * @Description: 测试文件是否存在
 * @Author: F-Stone
 * @Date: 2021-12-02 17:10:59
 * @LastEditTime: 2021-12-02 17:10:59
 * @LastEditors: F-Stone
 */

const fs = require("fs");

/**
 * 测试文件是否存在
 *
 * @param {*} path 文件目录
 * @param {*} [mode=fs.constants.F_OK | fs.constants.W_OK]
 * @return {*}
 */
exports.testFileIsExit = (path, mode = fs.constants.F_OK) => {
    return new Promise((res, rej) => {
        fs.access(path, mode, (err) => {
            if (err) {
                rej({
                    code: 1,
                    data: {
                        err,
                        param: { path, mode },
                    },
                    msg: "不存在",
                });
            }

            res({
                code: 0,
                data: {
                    exit: 0,
                    param: { path, mode },
                },
                msg: "",
            });
        });
    });
};
