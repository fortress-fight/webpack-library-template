/*
 * @Description: webpack style 处理
 * @Author: F-Stone
 * @Date: 2021-12-01 16:49:04
 * @LastEditTime: 2021-12-01 16:50:25
 * @LastEditors: F-Stone
 */

exports.styleRules = [
    {
        test: /\.css$/i,
        use: ['style-loader', "css-loader"]
    }
]
