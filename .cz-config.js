/*
 * @Description: 自定义 cz 提示信息
 * @Author: F-Stone
 * @Date: 2021-11-30 19:05:47
 * @LastEditTime: 2021-11-30 19:10:28
 * @LastEditors: F-Stone
 */

"use strict";

module.exports = {
    types: [{
            value: "feature",
            name: "feature: 引入新特性"
        },
        {
            value: "update",
            name: "update: 更新文件"
        },
        {
            value: "fix",
            name: "fix: 修复 Bug"
        },
        {
            value: "style",
            name: "style: 改进代码的结构/格式"
        },
        {
            value: "refactor",
            name: "refactor: 代码重构（没有修复 Bug 和引入新特性）"
        },
        {
            value: "test",
            name: "test: 添加测试"
        },
        {
            value: "revert",
            name: "revert: 代码回退"
        },
        {
            value: "WIP",
            name: "WIP: 开发中"
        },
        {
            value: "merge",
            name: "merge: 合并代码"
        },
        {
            value: "chore",
            name: "chore: 变更构建流程或辅助工具"
        },
        {
            value: "docs",
            name: "docs: 文档变更"
        },
        {
            value: "build",
            name: "build: 变更项目构建或外部依赖"
        },
        {
            value: "perf",
            name: "perf: 优化性能"
        }
    ],
    allowTicketNumber: false,
    isTicketNumberRequired: false,
    ticketNumberPrefix: "TICKET-",
    ticketNumberRegExp: "\\d{1,5}",
    messages: {
        type: "选择提交的更改类型:",
        scope: "\n写一个简单的描述 (可选):",
        customScope: "说明更改范围:",
        subject: "简短说明 (100):\n",
        body: '详细描述，使用 "|" 换行 (可选):\n',
        breaking: "非兼容性说明 (可选):\n",
        footer: "关联关闭的 issue (可选). 例如: #31, #34:\n",
        confirmCommit: "确定提交说明?"
    },

    allowCustomScopes: true,
    allowBreakingChanges: ["feature", "fix"],
    skipQuestions: [],
    subjectLimit: 100
};
