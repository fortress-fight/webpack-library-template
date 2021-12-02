<!--
 * @Description: 对 webpack 补充信息
 * @Author: F-Stone
 * @Date: 2021-12-02 15:02:38
 * @LastEditTime: 2021-12-02 16:58:55
 * @LastEditors: F-Stone
-->

# Webpack 其它

## 体验

1.  `webpack-build-notifier`
    在打包结束后发动系统通知
2.  `friendly-errors-webpack-plugin`
    优化打包时的输出信息

## 优化

1.  `webpack-bundle-analyzer`
    输出包关联信息以方便优化

## ProvidePlugin

通过使用 `ProvidePlugin` 来代替 `import`

使用 `ProvidePlugin` 的 `module` 将会在你使用该 `module` 时自动导入

示例：

```javascript
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
});
```

```javascript
new webpack.ProvidePlugin({
  _map: ['lodash', 'map'],
});
```

```javascript
new webpack.ProvidePlugin({
  Vue: ['vue/dist/vue.esm.js', 'default'],
});
```

```javascript
new webpack.ProvidePlugin({
  'window.jQuery': 'jquery',
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
        console.log('Debug info');
        }
        if (true) {
        console.log('Production log');
        }
    ```

    经过压缩后：

    ```js
        console.log('Production log');
    ```
