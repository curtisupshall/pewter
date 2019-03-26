import { RGB } from "./RGB";
export declare type Image = HTMLImageElement;
export declare class Canvas {
    private canvas;
    data: RGB[];
    constructor(image: Image);
    size: () => number;
}
