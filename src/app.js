/*
 * @Description: 项目的 app module 入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 13:43:22
 * @LastEditTime: 2021-12-02 16:36:44
 * @LastEditors: F-Stone
 */
import "@/style/index.css";
import imgPath from "@/asset/images/webpack.png";
import fontPath from "@/asset/fonts/Montserrat-Light-6.otf";
import videoPath from "@/asset/medias/pexels-mikhail-nilov.mp4";
import "@/asset/plugins/no-parse-example";

console.log("videoPath:", videoPath);
console.log("fontPath:", fontPath);
console.log("imgPath:", imgPath);
console.log("project setup ...");

async function getLodash() {
    try {
        const { default: _ } = await import(/* webpackChunkName: "lodash" */"lodash");
        return _;
        
    } catch (error) {
        return 'An error occurred while loading the module'
    }
}

getLodash().then((_) => {
    console.log(_)
});
