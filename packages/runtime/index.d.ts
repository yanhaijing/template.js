import { ParserOption } from '@templatejs/parser';
export interface Option extends ParserOption {
    compress?: boolean;
    error?: (e: any) => void;
}
declare function encodeHTML(source: string): string;
declare function runtime(): void;
declare namespace runtime {
    var config: (option: Option) => Option;
    var compress: (html: string) => string;
    var handelError: (e: Error) => {
        (): string;
        toString(): string;
    };
    var registerFunction: (name: string, fn: (param: any) => any) => any;
    var unregisterFunction: (name: string) => boolean;
    var registerModifier: (name: string, fn: (param: any) => any) => any;
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
