# webpack-local-debug

使用 webpack 搭建的 JavaScript 项目本地调试模板

-   本地调试需配合 [whistle](https://wproxy.org/whistle/) 以及 chrome 插件 [Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)

## 配置 

1.  通过插件 `Proxy SwitchyOmega` 将需要拦截的网址拦截到  `whistle` 启动的端口下以 `8899` 为例 `http://127.0.0.1:8899/`
2.  添加 `whistle` 规则 示例：
    
    ```bash
    # 用于劫持 hot-reload 的执行文件, 到 8080 端口
    /baidu\.com/(.*)\.hot-update\.(.*)/ localhost:8080/$1.hot-update.$2    
    # 用于替换响应文件
    https://www.baidu.com 10.0.0.18:8080
    # 用于追加文件
    https://www.baidu.com jsAppend://http://localhost:8080/script/index.js
    ```
