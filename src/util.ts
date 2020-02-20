export const MAX_DISTANCE: number = 16581375 // 255^3

export const distance = (vector1: number[], vector2: number[]): number => {
    try {
        let distance: number = 0;
        for (let i = 0; i < vector1.length; i ++) {
            distance += Math.pow(vector1[i] - vector2[i], 2) 
        }
        return distance
    } catch {
        throw new Error('Vector lengths do not agree.')
    }
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
    console.log('color:', color)
    return `#${color[0].toString(16)}${color[1].toString(16)}${color[2].toString(16)}`
}

export const invertColors = (data: number[][][]): number[][][] => {
    const newImage: number[][][] = new Array(data.length)
    for (let i: number = 0; i < data.length; i ++) {
        newImage.push(new Array(data[i].length))
        for (let j: number = 0; j < data[i].length; j ++) {
            newImage[i].push(new Array(data[i][j].length))
            for (let k: number = 0; k < data[i][j].length; k ++) {
                newImage[i][k][k] = 255 - data[i][j][k]
            }
        }
    }

    return newImage
}

export const bilateralFilter = () => {

}
