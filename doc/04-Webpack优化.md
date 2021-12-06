<!--
 * @Description: Webpack 优化方式记录
 * @Author: F-Stone
 * @Date: 2021-12-02 10:53:24
 * @LastEditTime: 2021-12-06 14:31:39
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

    补充：

    -   如果希望控制分包后的文件名称，可以指定 name

        ```javascript
        {
            // webpack.config.js
            splitChunks: {
                chunks: "all",
                name(module, chunks, cacheGroupKey) {
                    let moduleFileName = module
                        .identifier()
                        .split(/[\\/]/)
                        .reduceRight((item) => item);
                    moduleFileName = moduleFileName.slice(
                        0,
                        moduleFileName.lastIndexOf(".")
                    );

                    const allChunksNames = chunks
                        .map((item) => item.name)
                        .join("~");
                    return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                },
            },
        }
        ```

        但是由于输出相同名称的包会打包到一个 chunk 中，将会带来性能上的损耗，所以建议同时开始 `HASH_NAME`

建议将 1 和 2 结合使用，已经明确知道的将在多个入口文件中使用或者体积比较大的依赖（此时可以配合 noParse 进一步优化），直接在入口处进行优化，其余的情况可以通过 `SplitChunksPlugin` 进一步的细化

### 利用分包进行缓存优化

我们可以将第三方库(`library`)（例如 `lodash` 或 `react`）提取到单独的 `vendor chunk` 文件中，利用 `client` 的长效缓存机制，命中缓存来消除请求，并减少向 `server` 获取资源，同时还能保证 `client` 代码和 `server` 代码版本一致。

1.  将 `runtime` 代码拆分为一个单独的 `chunk`

    ```javascript
    // webpack.config.js
    {
        optimization: {
            runtimeChunk: 'single',
        },
    }
    ```

2.  通过 `cacheGroups` 分理出不会频繁修改的代码

    ```javascript
    // webpack.config.js
    {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    },
                },
            },
        },
    }
    ```

3.  通过模块标识符`module.id`进行区分

    模块的打包时，当 `module.id` 发生变化的时候，将会导致重新打包。`module.id`默认是解析顺序进行增量变化。

    我们可以做以下修改：

    ```javascript
    // webpack.config.js
    {
        optimization: {
            // deterministic 被哈希转化成的小位数值模块名。
            moduleIds: 'deterministic',
        },
    }
    ```

    注：
    重新打包的判定方式：

    -   `main` 入口 bundle 会随着自身的新增内容的修改，而发生变化。
    -   `module.id` 分包 bundle 的变化，而发生变化。
    -   `runtime` 编译 bundle 会因为现在包含一个新模块的引用，而发生变化。

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

### CSS 的分包

首先选用 mini-css-extract-plugin 对 css 文件进行分包处理，但如果我们希望能够对 css 进行更加细化的处理时，可以配合 `splitChunks.cacheGroups` 进行使用

例如：

1.  希望所有 css 输出到同一个文件

    ```javascript
    // webpack.config.js
    {
        cacheGroups: {
            styles: {
                type: "css/mini-extract",
                name: "styles_foo",
                chunks: "all",
                enforce: true,
            },
        }
    }
    ```

2.  希望针对不同的 chunk 分配到不同文件

    ```javascript
    // webpack.config.js
    {
        cacheGroups: {
            fooStyles: {
                type: "css/mini-extract",
                name: "styles_foo",
                chunks: (chunk) => {
                    return chunk.name === "foo";
                },
                enforce: true,
            },
        }
    }
    ```

### 异步加载

#### 动态导入 [import()](https://webpack.docschina.org/api/module-methods/#import)

示例：

```javascript
async function getComponent() {
    const element = document.createElement("div");
    const { default: _ } = await import("lodash");

    return import("lodash")
        .then(({ default: _ }) => {
            const element = document.createElement("div");
            element.innerHTML = _.join(["Hello", "webpack"], " ");

            element.innerHTML = _.join(["Hello", "webpack"], " ");

            return element;
        })
        .catch((error) => "An error occurred while loading the component");
    return element;
}

getComponent().then((component) => {
    document.body.appendChild(component);
});
```

1.  `Magic Comments`

    内联注释使这一特性得以实现。 通过在 import 中添加注释，我们可以进行诸如给 chunk 命名或选择不同模式的操作。

    示例：

    ```javascript
    // 单个目标
    import(
        /* webpackChunkName: "my-chunk-name" */
        /* webpackMode: "lazy" */
        /* webpackExports: ["default", "named"] */
        "module"
    );

    // 多个可能的目标
    import(
        /* webpackInclude: /\.json$/ */
        /* webpackExclude: /\.noimport\.json$/ */
        /* webpackChunkName: "my-chunk-name" */
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackPreload: true */
        `./locale/${language}`
    );
    ```

    > 不正确地使用 webpackPreload 会有损性能，请谨慎使用。

## 自定义压缩行为

> webpack v5 开箱即带有最新版本的 terser-webpack-plugin。如果你使用的是 webpack v5 或更高版本，同时希望自定义配置，那么仍需要安装 terser-webpack-plugin。

## thread-loader

使用 `thread-loader` 对一些复制任务进行优化，比如：`js / sass` 的处理

## tree shaking

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)

### [sideEffects](https://webpack.docschina.org/guides/tree-shaking/)

通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

使用 sideEffects 需要满足以下几点

1.  使用 ES2015 模块语法（即 import 和 export）
2.  确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 的（顺带一提，这是现在常用的 @babel/preset-env 的默认行为）。
    建议设置 babel

    ```javascript
    {
        loader: "babel-loader",
        options: {
            cacheDirectory: true,
            presets: [["@babel/preset-env", {modules: false}]],
            plugins: ["@babel/plugin-transform-runtime"],
        },
    },
    ```

3.  `package.json` 中添加 `"sideEffects": false,`
    **在实际使用的过程中，没有设置该选项，没有使用的部分同样会被移除**
4.  使用生产模式，在压缩的过程中，被标记的部分将会被移除
    通过 `terser-webpack-plugin` 中的 `unused` 配置实现

在实际使用的使用，并没有经过单独的配置，在 `production` 中就已经实现了 `sideEffects` 行为

#### 补充

1.  将函数调用标记为无副作用
    我们可以主动告诉 webpack 一个函数调用是无副作用的，只要通过 `/*#__PURE__*/` 注释。它可以被放到函数调用之前，用来标记它们是无副作用的(pure)。

    传到函数中的入参是无法被刚才的注释所标记，需要单独每一个标记才可以。

    如果一个没被使用的变量定义的初始值被认为是无副作用的（pure），**它会被标记为死代码，不会被执行且会被压缩工具清除掉。**这个行为需要设置 `optimization.innerGraph` 成 `true。`
