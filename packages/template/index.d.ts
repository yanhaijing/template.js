import { Option } from '@templatejs/runtime';
declare function compile(tpl: string, opt?: Option): Function;
declare function template(tpl: string, data: any): any;
declare namespace template {
    var config: (option: Option) => Option;
    var registerFunction: (name: any, fn: any) => any;
    var unregisterFunction: (name: any) => boolean;
    var registerModifier: (name: any, fn: any) => any;
    var unregisterModifier: (name: any) => boolean;
    var encodeHTML: any;
    var compress: (html: string) => string;
    var handelError: (e: any) => {
        (): string;
        toString(): string;
    };
    var __encodeHTML: any;
    var __compress: (html: string) => string;
    var __handelError: (e: any) => {
        (): string;
        toString(): string;
    };
    var __compile: typeof compile;
    var version: string;
}
export default template;
