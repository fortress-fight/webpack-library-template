/*
 * @Description: 项目的 app module 入口文件
 * @Author: F-Stone
 * @Date: 2021-12-01 13:43:22
 * @LastEditTime: 2021-12-07 01:06:46
 * @LastEditors: F-Stone
 */
import * as _ from "lodash";

import { curb } from "@/script/math";

function component() {
    const element = document.createElement("div");

    element.innerHTML = _.join(["Hello", "webpack", curb(5)], " ");

    return element;
}

document.body.appendChild(component());

const a = { bell: "a" };
console.log(a);
