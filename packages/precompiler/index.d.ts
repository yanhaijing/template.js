import { ParserOption } from '@templatejs/parser';
export interface PrecompileOption extends ParserOption {
    expression?: string;
    compress?: boolean;
    tplName?: string;
    sandbox?: boolean;
}
export declare function detectVar(code: string): string[];
export declare function generateVarCode(nameList: string[], sandbox: boolean): string;
export declare function precompile(tpl: string, opt?: PrecompileOption): string;
