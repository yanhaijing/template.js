var path = require("path");

module.exports = {
    entry: "./app.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tmpl/,
                use: [
                    {
                        loader: 'templatejs-loader',
                        options: {
                            sTag: '<%',
                            eTag: '%>',
                            expression: 'require("@templatejs/runtime").default'
                        }
                    }
                ]
            }
        ]
    }
};
