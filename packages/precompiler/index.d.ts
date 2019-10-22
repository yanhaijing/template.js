interface Opt {
    sTag?: string;
    eTag?: string;
    escape?: boolean;
    expression?: string;
    compress?: boolean;
    tplName?: string;
}
export declare function precompile(tpl: string, opt?: Opt): string;
export {};
