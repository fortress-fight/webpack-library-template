<!--
 * @Description: Webpack 优化方式记录
 * @Author: F-Stone
 * @Date: 2021-12-02 10:53:24
 * @LastEditTime: 2021-12-02 11:40:38
 * @LastEditors: F-Stone
-->

# Webpack 优化

## 性能优化

1.  [noParse](https://webpack.docschina.org/configuration/module/#modulenoparse)

    示例: 通过 `noParse` 跳过对 `assets/plugin` 内部的 `js` 的解析操作

    ```javascript
    // webpack.config.js
    {
        module: {
            noParse: /asset\\plugins\\.+\.js$/,
        },
    }
    ```

## 分包策略

如果不采用合适的分包策略的话，如果不同的入口文件中，引入的相同文件，将会在两个入口文件中重复出现，将会导致增加打包体积以及打包时间。

1.  从入口依赖入手

    使用 [dependOn](https://webpack.docschina.org/configuration/entry-context/#dependencies) 选项优化

    默认情况下，每个入口 chunk 保存了全部其用的模块(modules)。 使用 dependOn 选项你可以与另一个入口 chunk 共享模块:

    例如:

    -   优化前:

        ```javascript
        {
            entry: {
                index: path.resolve(SRC_PATH, "app.js"),
                another: path.resolve(SRC_PATH, "another.js"),
            }
        }
        ```

    -   优化后:

        ```javascript
        {
            entry: {
                index: {
                    import: path.resolve(SRC_PATH, "app.js"),
                    dependOn: "share"
                },
                another: {
                    import: path.resolve(SRC_PATH, "another.js"),
                    dependOn: "share"
                },
                share: "lodash"
            }
        }
        ```

2.  [SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)

    使用代码分割是 webpack 中最常用的一种分包策略，通过对代码中公共的引用的提取并进行单独的分包，来减少打包后的体积

    ```javascript
    // webpack.config.js
    {
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
    }
    ```

建议将 1 和 2 结合使用，已经明确知道的将在多个入口文件中使用或者体积比较大的依赖（此时可以配合 noParse 进一步优化），直接在入口处进行优化，其余的情况可以通过 `SplitChunksPlugin` 进一步的细化

### 分包策略的注意事项

在分包被共用时，webpack 的模块加载器，将会在每个入口处单独进行注册，这将会导致模块会进行重复的实例化，从而使得模块每个实例都会存在独立的状态。 为解决这个问题还需要进一步的优化

问题的详细描述可参考: [Multiple Entry Points Per Page](https://bundlers.tooling.report/code-splitting/multi-entry/)

优化方法:

```javascript
// webpack.config.js
{
    optimization: {
        runtimeChunk: "single",
    },
}
```

此方法是将公用模块的加载器单独分包后再进行共享，在打包的时候将会多出 `script/runtime.js` 文件
