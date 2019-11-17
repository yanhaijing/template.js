import { PrecompileOption } from '@templatejs/precompiler';
declare const enum Module {
    Commonjs = "commonjs"
}
export interface Options extends PrecompileOption {
    sandbox?: boolean;
    module?: Module;
}
export {};
