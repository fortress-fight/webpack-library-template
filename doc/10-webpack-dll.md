<!--
 * @Description: webpack dll 优化支持
 * @Author: F-Stone
 * @Date: 2021-12-06 16:22:06
 * @LastEditTime: 2021-12-06 17:34:28
 * @LastEditors: F-Stone
-->

# Webpack Dll Plugin

使用 `webpack.DllPlugin` 可以将一些不常发生变化的库，先独立打包出来，以节省开发时，项目文件打包的消耗。

## 配置

配合 `add-asset-html-webpack-plugin` 使用，可以自动导入，通过 `webpack.DllPlugin` 打包出的文件，十分方便

```bash
yarn add -D add-asset-html-webpack-plugin
```

具体的配置文件：

1.  `webpack\plugins\webpack-plugin-dll.js`
2.  `webpack\webpack.dll.config.js`
