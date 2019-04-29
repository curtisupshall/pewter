import { RGB } from './RGB';
export declare class Bucket {
    private data;
    constructor(colors: RGB | RGB[]);
    push: (color: RGB) => void;
    peek: () => RGB;
    pop: () => RGB | undefined;
    isEmpty: () => boolean;
    size: () => number;
    swirl: () => RGB;
}
