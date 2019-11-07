import { PrecompileOption } from '@templatejs/precompiler';
export interface Options extends PrecompileOption {
    sandbox?: boolean;
}
export default function (tpl: string): string;
