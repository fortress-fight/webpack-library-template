/*
 * @Description: 创建文件
 * @Author: F-Stone
 * @Date: 2021-12-02 17:11:40
 * @LastEditTime: 2021-12-02 17:11:41
 * @LastEditors: F-Stone
 */

const fs = require("fs");
const path = require("path");

/**
 *创建文件
 *
 * @export
 * @param {string} filePath 文件路径
 * @param {string} data 写入内容
 * @return {*}  {(Promise<{
 *     code: 0 | 1;
 *     data: { path: string; data: string };
 *     msg: string;
 * }>)}
 */
exports.createFile = (filePath, data) => {
    function mkdirSync(dirname) {
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (mkdirSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    }
    return new Promise((res, rej) => {
        mkdirSync(path.dirname(filePath));
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                rej({
                    code: 0,
                    data: err,
                    msg: "创建文件失败",
                });
            } else {
                res({
                    code: 1,
                    data: { path: filePath, data },
                    msg: "创建成功",
                });
            }
        });
    });
};
