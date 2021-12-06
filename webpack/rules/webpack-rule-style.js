/*
 * @Description: webpack style 处理
 * @Author: F-Stone
 * @Date: 2021-12-01 16:49:04
 * @LastEditTime: 2021-12-06 10:33:13
 * @LastEditors: F-Stone
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { OUT_FILE_PATH } = require("../config/webpack.path");
const { IS_DEV_MODE, USE_THREAD_LOADER } = require("../config/webpack.env");

const defaultPlugins = [
    require("postcss-sass-unicode"),
    require("postcss-preset-env")({ stage: 0 }),
    require("postcss-aspect-ratio-mini"),
];

/* ---------------------------------- */
/*             css loader             */
/* ---------------------------------- */
const CssLoaders = IS_DEV_MODE
    ? ["style-loader", "css-loader"]
    : [
          {
              loader: MiniCssExtractPlugin.loader,
              options: {
                  // 当使用相对路径时，如果采用绝对路径（webpackOptions.output 中的 publicPath），使用默认行为即可
                  publicPath: path.posix.join(
                      path.relative(OUT_FILE_PATH.OUT_STYLE_PATH, ""),
                      "/"
                  ),
              },
          },
          "css-loader",
      ];

/* ---------------------------------- */
/*           postcss loader           */
/* ---------------------------------- */
if (!IS_DEV_MODE) {
    defaultPlugins.push(
        require("cssnano")({
            preset: ["default", { discardComments: { removeAll: true } }],
        })
    );
}

const PostcssLoader = {
    loader: "postcss-loader",
    options: {
        postcssOptions: (api) => {
            if (/\.mobile\./.test(api.file)) {
                return {
                    plugins: [
                        ...defaultPlugins,
                        require("postcss-write-svg")({
                            uft8: false,
                        }),
                        require("postcss-px-to-viewport")({
                            viewportWidth: 750, // 设计稿宽度
                            viewportHeight: 2416, // 设计稿高度，可以不指定
                            unitPrecision: 3, // px to vw无法整除时，保留几位小数
                            viewportUnit: "vw", // 转换成vw单位
                            selectorBlackList: [".ignore", ".hairlines"], // 不转换的类名
                            minPixelValue: 1, // 小于1px不转换
                            mediaQuery: true, // 允许媒体查询中转换
                            exclude: undefined,
                            include: undefined,
                        }),
                        require("postcss-viewport-units")({
                            filterRule: (rule) =>
                                rule.nodes.findIndex(
                                    (i) => i.prop === "content"
                                ) === -1,
                        }),
                    ],
                };
            }
            return { plugins: defaultPlugins };
        },
    },
};

/* ---------------------------------- */
/*             sass loader            */
/* ---------------------------------- */
const SassLoader = {
    loader: "sass-loader",
    options: {
        implementation: require("sass"),
        additionalData: `
            @import "@/style/tools/mixin.scss";
            @import "@/style/tools/var.scss";
        `,
    },
};

exports.cssRules = [
    {
        test: /\.css$/i,
        use: IS_DEV_MODE ? CssLoaders : [...CssLoaders, PostcssLoader],
    },
];

exports.sassRules = [
    {
        test: /\.s[ac]ss$/i,
        use: IS_DEV_MODE
            ? USE_THREAD_LOADER
                ? [...CssLoaders, SassLoader]
                : ["thread-loader", ...CssLoaders, SassLoader]
            : [...CssLoaders, SassLoader, PostcssLoader],
    },
];
