export interface Option {
    sTag: string;
    eTag: string;
    compress: boolean;
    escape: boolean;
    error: Function;
}
declare function encodeHTML(source: string): string;
declare function runtime(): void;
declare namespace runtime {
    var config: (option: Option) => Option;
    var compress: (html: string) => string;
    var handelError: (e: any) => {
        (): string;
        toString(): string;
    };
    var registerFunction: (name: string, fn: Function) => any;
    var unregisterFunction: (name: string) => boolean;
    var registerModifier: (name: string, fn: Function) => any;
    var unregisterModifier: (name: string) => boolean;
    var encodeHTML: typeof encodeHTML;
    var functionMap: {};
    var modifierMap: {
        '': (param: any) => any;
        'h': (param: any) => string;
        'u': (param: any) => string;
    };
    var o: Option;
}
export default runtime;
