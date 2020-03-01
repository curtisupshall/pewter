export const MAX_DISTANCE: number = 16581375 // 255^3

/**
 * Determines the distance between two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @return The square of the Euclidean distance between the two vectors, or `-1` if it cannot
 * be determined.
 */
export const distance = (a: number[], b: number[]): number => {
    if (a && b && a.length === b.length) {
        let distance: number = 0;
        for (let i = 0; i < a.length; i ++) {
            distance += Math.pow(a[i] - b[i], 2) 
        }
        return distance
    }
    return -1
}

export const mean = (set: number[][]): number[] => {
    const length: number = set.length
    if (length === 0) {
        return
    }

    let meanVector: number[] = []
    let i: number
    for (i = 0; i < set[0].length; i ++) {
        meanVector[i] = 0
    }
    for (i = 0; i < length; i ++) {
        for (let j: number = 0; j < set[i].length; j ++) {
            meanVector[j] += set[i][j]
        }
    }

    return meanVector.map((component: number) => component / length)
} 

export const fromHex = (hex: string): number[] => {
    return [
        parseInt(hex.substr(0, 2), 16),
        parseInt(hex.substr(2, 2), 16),
        parseInt(hex.substr(4, 2), 16)
    ]
}

export const toHex = (color: number[]) => {
    return `#${color[0].toString(16)}${color[1].toString(16)}${color[2].toString(16)}`
}

export const invertColors = (data: number[][][]): number[][][] => {
    if (!data) {
        return
    }
    for (let i: number = 0; i < data.length; i ++) {
        for (let j: number = 0; j < data[i].length; j ++) {
            for (let k: number = 0; k < data[i][j].length; k ++) {
                const inverse: number = 255 - data[i][j][k]
                data[i][j][k] = inverse
            }
        }
    }

    return data
}
