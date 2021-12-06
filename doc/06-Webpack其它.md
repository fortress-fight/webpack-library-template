<!--
 * @Description: 对 webpack 补充信息
 * @Author: F-Stone
 * @Date: 2021-12-02 15:02:38
 * @LastEditTime: 2021-12-06 18:21:47
 * @LastEditors: F-Stone
-->

# Webpack 其它

## 体验

1.  `webpack-build-notifier`
    在打包结束后发动系统通知
2.  `friendly-errors-webpack-plugin`
    优化打包时的输出信息，此时可以将 webpack 的输出关闭

    ```js
    // webpack.config.js
    // preset: minimal
    {stats: { preset: "none", colors: true },}
    ```

## 优化

1.  `webpack-bundle-analyzer`
    输出包关联信息以方便优化

## ProvidePlugin

通过使用 `ProvidePlugin` 来代替 `import`

使用 `ProvidePlugin` 的 `module` 将会在你使用该 `module` 时自动导入

示例：

```javascript
new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
});
```

```javascript
new webpack.ProvidePlugin({
    _map: ["lodash", "map"],
});
```

```javascript
new webpack.ProvidePlugin({
    Vue: ["vue/dist/vue.esm.js", "default"],
});
```

```javascript
new webpack.ProvidePlugin({
    "window.jQuery": "jquery",
});
```

## DefinePlugin

`DefinePlugin` 允许在编译时将你代码中的变量替换为其他值或表达式。这在需要根据开发模式与生产模式进行不同的操作时，非常有用。例如，如果想在开发构建中进行日志记录，而不在生产构建中进行，就可以定义一个全局常量去判断是否记录日志。这就是 `DefinePlugin` 的发光之处，设置好它，就可以忘掉开发环境和生产环境的构建规则。

### 注

1.  请注意，由于本插件会直接替换文本，因此提供的值必须在字符串本身中再包含一个 实际的引号 。通常，可以使用类似 '"production"' 这样的替换引号，或者直接用 JSON.stringify('production')。

2.  调试的代码可以通过压缩自动删除

    未经 webpack 压缩过的代码：

    ```js
    if (!true) {
        console.log("Debug info");
    }
    if (true) {
        console.log("Production log");
    }
    ```

    经过压缩后：

    ```js
    console.log("Production log");
    ```

## expose-loader

如果希望讲一个 `module` 输出的模块定义为全局变量，可以使用 [expose-loader](https://webpack.docschina.org/loaders/expose-loader/)

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: require.resolve("./src/globals.js"),
                use: "exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse",
            },
            {
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                    exposes: ["$", "jQuery"],
                },
            },
            {
                test: require.resolve("underscore"),
                loader: "expose-loader",
                options: {
                    exposes: [
                        "_.map|map",
                        {
                            globalName: "_.reduce",
                            moduleLocalName: "reduce",
                        },
                        {
                            globalName: ["_", "filter"],
                            moduleLocalName: "filter",
                        },
                    ],
                },
            },
        ],
    },
};
```

或者使用行间引入方式
`'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse',`

## imports-loader

在某些项目中存在，this 的指定 window ，当模块运行在 CommonJS 上下文中，这将会变成一个问题。 我们可以通过 `imports-loader` 中指定 this

示例：

```javascript
// webpack.config.js
{
    module: {
        rules: [
            {
                test: require.resolve('./src/index.js'),
                use: 'imports-loader?wrapper=window',
            },
        ],
    },
}
```

## require.context

语法：

```javascript
// mode: sync | lazy
require.context(
    directory,
    (useSubdirectories = true),
    (regExp = /^\.\/.*$/),
    (mode = "sync")
);
```

示例：`require.context('./test', false, /\.test\.js$/);`

完整示例：

```javascript
// 同步行为
const context = require.context("locales", true, /\.json$/);
context.keys().forEach((fillName) => {
    try {
        const component = context(fillName);
        // do something with locale
    } catch (error) {
        console.error(error);
    }
});
```

```js
var context = require.context('locales', true, /\.json$/, 'lazy');
context.keys().forEach((fillName) => {
    context(fillName).then((locale) => {
        // do something with locale
    }).catch (error) {
        console.error(error);
    }
});
```

## [Web Workers](https://webpack.docschina.org/guides/web-workers/)

从 webpack 5 开始，你可以使用 Web Workers 代替 worker-loader。

## [gulp](https://webpack.docschina.org/guides/integrations/#gulp)

## [每个入口使用多种文件类型](https://webpack.docschina.org/guides/entry-advanced/)

每个入口使用多种文件类型，可以实现将 CSS 和 JavaScript（和其他）文件分离在不同的 bundle。

## 需要进一步了解的内容

1.  [开发 - Vagrant](https://webpack.docschina.org/guides/development-vagrant/)

    使用虚拟机开发环境配合 Nginx 实现对线上环境的模拟开发
