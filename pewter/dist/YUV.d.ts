export declare class YUV {
    protected Y: number;
    protected U: number;
    protected V: number;
    constructor(Y?: number, U?: number, V?: number);
    /**
    * Computes the Euclidean distance between two YUV
    * colors.
    * @param color Another YUV color
    * @return The distance between the two colors
    */
    distanceTo(other: YUV): number;
}
