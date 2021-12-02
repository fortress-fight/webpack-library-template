<!--
 * @Description: Webpack 中不易察觉的问题
 * @Author: F-Stone
 * @Date: 2021-12-02 10:50:31
 * @LastEditTime: 2021-12-02 14:21:39
 * @LastEditors: F-Stone
-->

# Webpack 注意事项

## 分包时

1.  [尽可能不要对拆分的 chunk 分配相同的名称](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunksname)

## 多入口 entry

    尽管可以在 webpack 中允许每个页面使用多入口，但是我们应该尽可能避免使用多入口的入口：`entry: { page: ['./analytics', './app'] }`。建议使用异步脚本来过的更好的优化以及一致的执行顺序
