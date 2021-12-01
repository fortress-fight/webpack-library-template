/*
 * @Description: 静态资源的处理逻辑
 * @Author: F-Stone
 * @Date: 2021-12-01 17:02:02
 * @LastEditTime: 2021-12-01 18:06:29
 * @LastEditors: F-Stone
 */

const path = require("path");

const { HASH_NAME_RULE } = require("../config/webpack.env");
const { OUT_FILE_PATH } = require("../config/webpack.path");
const { OUT_IMG_PATH, OUT_MEDIA_PATH, OUT_FONT_PATH } = OUT_FILE_PATH;

exports.assetRules = [
    // images
    {
        test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i,
        exclude: [],
        oneOf: [
            {
                // a.png?resource
                resourceQuery: /resource/,
                type: "asset/resource",
            },
            {
                resourceQuery: /inline/,
                type: "asset/inline",
            },
            {
                resourceQuery: /source/,
                type: "asset/source",
                generator: {
                    filename: path.posix.join(OUT_IMG_PATH, `${HASH_NAME_RULE}[ext]`),
                },
            },
            {
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 1 * 1024, // 1kb
                    },
                },
                generator: {
                    filename: path.posix.join(OUT_IMG_PATH, `${HASH_NAME_RULE}[ext]`),
                },
            },
        ],
    },
    // fonts
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: "asset/resource",
        generator: {
            filename: path.posix.join(OUT_FONT_PATH, `${HASH_NAME_RULE}[ext]`),
        },
    },
    // media
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        type: "asset/resource",
        generator: {
            filename: path.posix.join(OUT_MEDIA_PATH, `${HASH_NAME_RULE}[ext]`),
        },
    },
];
