# Git项目管理

建议使用 Git-Flow 分支模型对项目分支进行管理

## Git Commit 格式校验

-   全局安装依赖:

    ```bash
    npm i -g cz-customizable@6.3.0 commitizen@4.2.3  @commitlint/config-angular@^12.1.1
    ```

-   添加全局配置:

    ```bash
    echo '{ "path": "cz-customizable" }' > ~/.czrc
    ```

-   依赖插件:

    ```bash
    npm install -D cz-customizable@^6.3.0 commitlint@^12.1.1 commitizen@^4.2.3
    ```

-   使用 `cz-customizable`

    ```json
    // package.json
    {
        "config": {
            "commitizen": {
                "path": "cz-customizable"
            }
        }
    }
    ```

    添加自定义配置文件 -- `.cz-config.js`

-   添加自定义 `commitlint` 校验规则 -- `commitlint.config.js`
