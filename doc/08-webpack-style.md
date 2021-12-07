<!--
 * @Description: webpack 对样式文件的管理配置
 * @Author: F-Stone
 * @Date: 2021-12-02 18:40:51
 * @LastEditTime: 2021-12-07 10:59:45
 * @LastEditors: F-Stone
-->

# webpack style 配置扩展

## SASS

```bash
yarn add sass-loader@^12.3.0 sass@~1.32.13
```

通过文件 `webpack\rules\webpack-rule-style.js` 进行处理

注：

1.  `sass@~1.32.13` 之后的版本禁用了 `node-sass` 部分规则
2.  可以通过 `node-fibers` 优化，不过 `node-fibers` 不兼容 `Node >= 16.0.0`

    ```json
    sassOptions: {
        fiber: false,
    },
    ```

## post-css

通过文件 `webpack\rules\webpack-rule-style.js` 进行处理

```bash
yarn add postcss@^8.4.4 postcss-loader@^6.2.1 cssnano@^5.0.12 postcss-aspect-ratio-mini@^1.1.0 postcss-preset-env@^7.0.1 postcss-px-to-viewport@^1.1.1 postcss-sass-unicode@^0.1.0 postcss-write-svg@^3.0.1 
```
 
## stylelint 对 样式文件进行格式化校验

`stylelint.config.js`
