import { YUV } from "./YUV";
export declare const yuvConstants: {
    WR: number;
    WG: number;
    WB: number;
    U_MAX: number;
    V_MAX: number;
};
export declare class RGB {
    red: number;
    green: number;
    blue: number;
    constructor(r?: number, g?: number, b?: number);
    private toHex;
    toCSS(): string;
    toYUV(): YUV;
    distanceTo(other: RGB): number;
}
