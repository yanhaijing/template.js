import { defineConfig } from "vite";
import template from "rollup-plugin-templatejs";

export default defineConfig({
    plugins: [
        {
            ...template({
                expression: "window.template", // 获取template的表达式，如 `window.template`
            }),
            enforce: 'pre'
        },
    ],
});
