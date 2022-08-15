import path from "path";
import fs from "fs";
import template from "template_js";

interface Data {
    [key: string]: any;
    [key: number]: any;
}

export function renderFile(pathname: string, data: Data) {
    return compileFile(pathname).then((fn) => fn(data));
}

export function compileFile(pathname: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.resolve(pathname),
            {
                encoding: "utf-8",
            },
            (err, str) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(str);
            }
        );
    }).then((str: string) => {
        return template(str);
    });
}

export function renderFileSync(pathname: string, data: Data) {
    return compileFileSync(pathname)(data);
}
export function compileFileSync(pathname: string) {
    return template(fs.readFileSync(pathname, { encoding: "utf-8" }));
}
