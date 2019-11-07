import { ParserOption } from '@templatejs/parser';
export interface PrecompileOption extends ParserOption {
    expression?: string;
    compress?: boolean;
    tplName?: string;
}
export declare function detectVar(code: string): string[];
export declare function precompile(tpl: string, opt?: PrecompileOption): string;
