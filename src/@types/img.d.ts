/*
 * @Description: 图片类型文件的导入
 * @Author: F-Stone
 * @Date: 2021-12-06 15:57:26
 * @LastEditTime: 2021-12-06 15:57:42
 * @LastEditors: F-Stone
 */
declare module "*.svg" {
    const content: any;
    export default content;
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
