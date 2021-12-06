<!--
 * @Description: webpack 对 typescript 的处理
 * @Author: F-Stone
 * @Date: 2021-12-06 16:06:14
 * @LastEditTime: 2021-12-06 16:09:07
 * @LastEditors: F-Stone
-->

# typescript

```bash
yarn add -D ts-loader typescript
```

通过文件 `webpack\rules\webpack-rule-script.js` 进行控制

## tsconfig.json

```json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "esnext",
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": false,
        "resolveJsonModule": true,
        "jsx": "react",
        "importHelpers": true,
        "rootDir": "./src/",
        "outDir": "./dist/",
        "baseUrl": "./",
        "removeComments": false,
        "experimentalDecorators": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "paths": { "@/*": ["src/*"] },
        "sourceMap": true,
        "allowJs": true,
        "checkJs": true,
        "moduleResolution": "node"
    },
    "include": ["src/**/*", "tests/**/*"]
}
```

## @type

使用 `src\@types` 来存放本地的类型文件
