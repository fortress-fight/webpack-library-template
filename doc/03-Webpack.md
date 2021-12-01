# Webpack

安装基础依赖

```bash
yarn add -D cross-env@^7.0.3 webpack@^5.64.4  webpack-merge@^5.8.0 webpack-cli@^4.9.1
```

## Webpack 配置

在 `webpack/` 中管理 webpack 的配置文件, 通过 `webpack.config.js` 进行调用

## 添加 npm 命令

```json
// package.json
{
    "scripts": {
        "start": "cross-env NODE_ENV=development webpack",
        "build": "cross-env NODE_ENV=production webpack"
    },
}
```

## 配置 Webpack 插件

### 添加页面模板处理

> html-webpack-plugin": "^5.5.0

通过 `webpack/config/webpack.page.js` 对页面进行管理
