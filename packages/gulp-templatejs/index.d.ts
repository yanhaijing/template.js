import { PrecompileOption } from '@templatejs/precompiler';
declare const enum Module {
    Commonjs = "commonjs"
}
export interface Options extends PrecompileOption {
    module?: Module;
}
export {};
