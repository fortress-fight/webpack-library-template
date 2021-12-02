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

### 通用插件

> clean-webpack-plugin@^4.0.0
在 `production mode` 下, 每次打包前清理 `outPath`

### 添加页面模板处理

> html-webpack-plugin@^5.5.0
通过 `webpack/config/webpack.page.js` 对页面进行管理

### 样式文件处理

#### CSS

安装依赖

```bash
yarn add -D css-loader@^6.5.1 style-loader@^3.3.1
```

通过 `webpack/rules/webpack-rule-style.js` 对进行管理

### 静态文件处理

静态文件包含：字体、 图片、 媒体
处理方式：使用 webpack 自带的 [Rule.type](https://webpack.docschina.org/configuration/module/#ruletype) 进行处理
通过 `webpack/rules/webpack-rule-asset.js` 对进行管理

在 `pages/index.html` 中引入静态资源 (IMG_PATH 是通过 html-webpack-plugin 传入的参数):

```html
<img src="<%= IMG_PATH %>/webpack.png" alt="" />
<img src="<%= require("../src/asset/images/webpack.png") %>" alt="">
```

## web-server

添加插件

```bash
yarn add -D webpack-dev-server@4.6.0
```

通过 `webpack/config/webpack.devserver.js` 进行配置
