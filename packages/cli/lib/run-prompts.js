const inquirer = require("inquirer");

function prompts(promptList) {
    return new Promise(function (resolve) {
        return inquirer.prompt(promptList).then((answers) => {
            resolve(answers);
        });
    });
}

let promptList = [];

function runInitPrompts(pathname, argv) {
    const { type, manager } = argv;

    if (!pathname) {
        promptList.push({
            type: "input",
            message: "project name:",
            name: "name",
            validate: function (val) {
                if (!val) {
                    return "Please enter name";
                }
                return true;
            },
        });
    }

    if (!type) {
        promptList.push({
            type: "list",
            message: "switch project type:",
            name: "type",
            choices: [
                "webpack",
                "rspack",
                "vite",
                "rollup",
                "esbuild",
                "parcel2",
                "parcel1",
                "fis3",
                "browserify",
                "gulp",
                "browser",
            ],
        });
    }

    if (!manager) {
        promptList.push({
            type: "list",
            message: "package manager:",
            name: "manager",
            choices: ["no install", "npm", "yarn"],
            filter: function (value) {
                return {
                    npm: "npm",
                    yarn: "yarn",
                    "no install": null,
                }[value];
            },
        });
    }

    return prompts(promptList);
}

exports.runInitPrompts = runInitPrompts;
