import { Option as ParseOption } from '@templatejs/parser';
export interface Option extends ParseOption {
    expression?: string;
    compress?: boolean;
    tplName?: string;
}
export declare function precompile(tpl: string, opt?: Option): string;
