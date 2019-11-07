import { Option } from '@templatejs/runtime';
declare function compile(tpl: string, opt?: Option): {
    (data: object): string;
    toString(): string;
};
declare function template(tpl: string, data: object): string;
declare namespace template {
    var config: (option: Option) => Option;
    var registerFunction: (name: string, fn: (param: any) => any) => any;
    var unregisterFunction: (name: string) => boolean;
    var registerModifier: (name: string, fn: (param: any) => any) => any;
    var unregisterModifier: (name: string) => boolean;
    var encodeHTML: any;
    var compress: (html: string) => string;
    var handelError: (e: Error) => {
        (): string;
        toString(): string;
    };
    var functionMap: {};
    var modifierMap: {
        '': (param: any) => any;
        'h': (param: any) => string;
        'u': (param: any) => string;
    };
    var __encodeHTML: any;
    var __compress: (html: string) => string;
    var __handelError: (e: Error) => {
        (): string;
        toString(): string;
    };
    var __compile: typeof compile;
}
declare function template(tpl: string): (data: object) => string;
declare namespace template {
    var config: (option: Option) => Option;
    var registerFunction: (name: string, fn: (param: any) => any) => any;
    var unregisterFunction: (name: string) => boolean;
    var registerModifier: (name: string, fn: (param: any) => any) => any;
    var unregisterModifier: (name: string) => boolean;
    var encodeHTML: any;
    var compress: (html: string) => string;
    var handelError: (e: Error) => {
        (): string;
        toString(): string;
    };
    var functionMap: {};
    var modifierMap: {
        '': (param: any) => any;
        'h': (param: any) => string;
        'u': (param: any) => string;
    };
    var __encodeHTML: any;
    var __compress: (html: string) => string;
    var __handelError: (e: Error) => {
        (): string;
        toString(): string;
    };
    var __compile: typeof compile;
}
export default template;
