/*
 * @Description: 自定义 commitlint 规则
 * @Author: F-Stone
 * @Date: 2021-11-30 19:10:13
 * @LastEditTime: 2021-11-30 19:10:37
 * @LastEditors: F-Stone
 */
module.exports = {
    extends: ["@commitlint/config-angular"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feature",
                "build",
                "update",
                "docs",
                "fix",
                "style",
                "refactor",
                "perf",
                "test",
                "chore",
                "merge",
                "revert",
                "WIP",
            ],
        ],
    },
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w+)\((.+)\).*:\s*(.*)\s*$/,
            headerCorrespondence: ["type", "scope", "subject"],
        },
    },
};
