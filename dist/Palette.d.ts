import { RGB } from './RGB';
import { Canvas, Image } from './Canvas';
export default class Palette {
    colors: RGB[];
    canvas: Canvas;
    constructor(image: Image);
    /**
     * @TODO Make a timer for gathering/calculating
     */
    getColors: (n?: number, filter?: RGB[]) => RGB[];
}
